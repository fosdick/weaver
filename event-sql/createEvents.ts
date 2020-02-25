import moment from 'moment';

import { createUUID } from '../createUUID';
import { createLaunchReceive, filterPlanStartDate } from './piggingTasks';
import WorklistCreateEvents from './WorklistCreateEvents';

export default class CreateEvents extends WorklistCreateEvents {

  public validFrequencyTypes: any = {
    Daily: 'days',
    Monthly: 'months',
    Weekly: 'weeks',
    Yearly: 'years'
  };
  public validOccuranceTypes: any = {
    1: 'weeks',
    2: 'months',
    3: 'years'
  };
  public plantIdMap: any;
  public createPiggingLaunchReceive: boolean = true;
  public isTypePigging: boolean = true;
  public filterByPlanStartDate: boolean = true;
  public exList: any = {};
  public returnISO = (dateString: string) => {
    return moment.utc(dateString).format('YYYY-MM-DD');
  }
  public updateLaunchReceiveAssignment(dataObj: any, typeObj: any) {
    if (typeObj.USER_DEFINED_TASK_TYPE === 'launch') {
      dataObj.TYPE_ID = 5;
      dataObj.ORIG_START_DATE = dataObj.START_DATE;
      if (dataObj.META_DATA && dataObj.META_DATA.LAUNCH_ASSIGNMENT) {
        dataObj.ASSIGNEE = dataObj.META_DATA.LAUNCH_ASSIGNMENT;
      }
    }

    if (typeObj.USER_DEFINED_TASK_TYPE === 'receive') {
      dataObj.TYPE_ID = 6;
      dataObj.ORIG_START_DATE = dataObj.START_DATE;
      if (dataObj.META_DATA && dataObj.META_DATA.PLANT_ID && dataObj.META_DATA.PLANT_RECEIVE === '1') {

        if (this.plantIdMap && this.plantIdMap[dataObj.META_DATA.PLANT_ID]) {
          dataObj.ENTITY_NAME = this.plantIdMap[dataObj.META_DATA.PLANT_ID].PLANT_SUPV_EMAIL;
        }

      } else if (dataObj.META_DATA && dataObj.META_DATA.SUPERVISOR_RECEIVE === '1') {
        dataObj.ENTITY_NAME = dataObj.META_DATA.SUPERVISOR_RECEIVE_EMAIL;
      }

      if (dataObj.META_DATA && dataObj.META_DATA.RECEIPT_ASSIGNMENT) {
        dataObj.ASSIGNEE = dataObj.META_DATA.RECEIPT_ASSIGNMENT;
      }
    }
    // removes the time from the date checks in utc
    const startDateString = moment.utc(dataObj.START_DATE).toISOString().substr(0, 10);
    if (moment.utc(startDateString).add(30, 'h').unix() < moment.utc().unix()) {
      dataObj.OVERDUE = 1;
    } else {
      dataObj.OVERDUE = 0;
    }
    return dataObj;
  }
  public calcOccurence(
    dayOfMonth: number | boolean, taskEvent: any,
    taskStart: any, dayOfWeek: number | boolean, occurenceNo: number | boolean, occurenceType: number | boolean, yearlyOnMonth: number | boolean
  ) {
    let eventOffset = 0;
    taskEvent = moment.utc(taskStart.toISOString());
    if (yearlyOnMonth) {
      if (dayOfMonth) {
        taskEvent.set('day', dayOfMonth);
      } else {
        taskEvent.set('month', yearlyOnMonth);
      }
    }
    if (dayOfMonth) {
      taskEvent.date(dayOfMonth);
    } else if (dayOfWeek) {
      if (occurenceType === 2) {
        // if monthly set to start of month
        taskEvent.date(1);
      }
      // figuring out the offset of the occurenceType
      // console.log(taskEvent, 'before')
      while (eventOffset <= occurenceNo) {
        // console.log(eventOffset, occurenceNo, taskEvent.day() === dayOfWeek, dayOfWeek)
        if (taskEvent.day() === dayOfWeek) {
          eventOffset++;
          if (eventOffset < occurenceNo) {
            taskEvent.add(1, 'day');
          }
        } else {
          taskEvent.add(1, 'day');
        }
      }

    }
    // console.log(taskEvent, 'end result of function calcOccurence');
    return taskEvent;
  }
  public addToCalcList = (dataObj: any, taskEvent: any) => {
    // this.updateLaunchReceiveAssignment(dataObj, dataObj);
    const dataObjNew = {
      ...dataObj,
      ID: null,
      ORIG_ID: dataObj.ID,
      START_DATE: taskEvent.toISOString()
    };
    // console.log(calcList.length, 'calc list before the second');
    return dataObjNew;
  }
  public getOccuranceOffset = (beginDate: string, stopDate: string, dataObj: any) => {
    // return new Promise((resolve,reject) => {
    const beginD = moment.utc(beginDate);
    const stopD = moment.utc(stopDate);
    const occurenceNo = dataObj.OCCURRENCE_NO ? Number(dataObj.OCCURRENCE_NO) : false;
    const occurenceType = dataObj.OCCURRENCE_TYPE ? Number(dataObj.OCCURRENCE_TYPE) : false;
    const frequencyOffset = Number(dataObj.FREQUENCY_OFFSET) || 1;
    const frequency = dataObj.FREQUENCY;
    const dayOfWeek = dataObj.DAY_OF_WEEK ? Number(dataObj.DAY_OF_WEEK) : false;
    const dayOfMonth = dataObj.DAY_OF_MONTH ? Number(dataObj.DAY_OF_MONTH) : false;
    // console.log(dataObj, 'data obj')
    const yearlyOnMonth: any = dataObj.YEARLY_ON_MONTH ? Number(dataObj.YEARLY_ON_MONTH) : false;
    const calcList: any[] = [];
    const taskStart = moment.utc(dataObj.START_DATE);
    let taskEnd;
    if (!dataObj.END_DATE) {
      // if no end date set give one so calendar don't plot events forever.
      // the while loop below will run until the end date.
      taskEnd = moment().add(2, 'y');
    } else {
      taskEnd = moment.utc(dataObj.END_DATE);
    }
    const exListAr = Object.keys(this.exList);

    // we have to do Math on unix timestamp to add frequencyOffset to the given endDate (stopD)
    // the reason to use the variable freqOffsetDiff is to allow the while loop to advance past stop date
    // when plans are schedule for periods such as 2nd Wed of March yearly.  If the date range is Feb-Apr
    // and the plan start date is Jan, the calender logic needs check the entire yearly range to make sure
    // that a plan started in Jan, but does not have tasks until March fits within the date range requested.

    const tsx = taskStart.unix();
    const freqOffsetDiff = taskStart.add(frequencyOffset, this.validFrequencyTypes[frequency]).unix() - tsx;
    const sdx = stopD.unix();
    let stopDUnix;
    if (occurenceType && occurenceNo) {
      stopDUnix = moment.unix(sdx + freqOffsetDiff).unix();
    } else {
      stopDUnix = stopD.unix();
    }
    // console.log(moment.unix(stopDUnix).utc());
    taskStart.subtract(frequencyOffset, this.validFrequencyTypes[frequency]);
    if (taskStart) {
      let taskEvent = moment.utc(taskStart.toISOString());
      while (taskStart.unix() <= stopDUnix && taskStart.unix() <= taskEnd.unix()) {
        // while the start date is less than the stop date plus the frequencyOffset
        if (occurenceType && occurenceNo) {
          taskEvent = this.calcOccurence(dayOfMonth, taskEvent, taskStart, dayOfWeek, occurenceNo, occurenceType, yearlyOnMonth);
        } else if (dayOfMonth || yearlyOnMonth) {
          taskEvent = this.calcOccurence(dayOfMonth, taskEvent, taskStart, dayOfWeek, occurenceNo, occurenceType, yearlyOnMonth);
        } else {
          taskEvent = moment.utc(taskStart.toISOString());
        }
        calcList.push(this.addToCalcList(dataObj, taskEvent));
        taskStart.add(frequencyOffset, this.validFrequencyTypes[frequency]);
        // add the base frequency and offset after first pass
        // if not within the range continue to calc the next virtual task based on date offset settings
      }
      let tr: any[] = [];
      calcList.forEach((Lpig: any) => {
        this.updateLaunchReceiveAssignment(Lpig, dataObj);
        Lpig.UUID = createUUID(Lpig.TYPE_ID, Lpig.ORIG_ID, Lpig.START_DATE);
        if (dataObj.USER_DEFINED_TASK_TYPE && Number(dataObj.USER_DEFINED_TASK_TYPE) !== 1) {
          tr.push(Lpig);
        } else {
          if (this.createPiggingLaunchReceive) {
            tr = tr.concat(createLaunchReceive.call(this, Lpig));
          } else {
            tr.push(Lpig);
          }
        }
      });
      // console.log(tr.length, 'tr at end of and inside of GetOccurancef() ');
      return tr;
    }
  }
  public replaceVirtualTasksWithMaterial = (cal: any[], exList: any[]) => {
    const calExlistMerge: any[] = [];
    const exKeys: any = Object.keys(exList);
    cal.forEach((virtualTask: any) => {
      const obj: any = exList[virtualTask.UUID];
      if (exKeys.includes(virtualTask.UUID)) {
        if (obj.FREQUENCY === 'single-instance' && obj.TYPE_ID > 2) {
          calExlistMerge.push(obj);
        }
      } else {
        calExlistMerge.push(virtualTask);
      }
    });
    return calExlistMerge;
  }
  public plotCal = (r: any, d1: string, d2: string) => {
    // r is sql results d1 is startdate d2 is enddate
    let cal: any[] = [];
    this.exList = {};
    r.forEach((v: any) => {
      if (v.UUID) {
        this.exList[v.UUID] = { ...v };
      }
    });
    r.forEach((v: any) => {
      if (v.FREQUENCY && this.validFrequencyTypes[v.FREQUENCY] && v.START_DATE && v.TYPE_ID < 3) {
        // less than 3 for types 1 and 2 that are the only 2 valid types for spawning virtual tasks.
        cal = cal.concat(this.getOccuranceOffset(d1, d2, v));
        // console.log(cal, 'from the getO function')

      } else if (v.FREQUENCY === 'single-instance' && (v.TYPE_ID < 3)) {
        const Lpig = Object.assign(v);
        Lpig.ORIG_ID = v.ID;
        Lpig.ID = null;
        this.updateLaunchReceiveAssignment(Lpig, v);
        if (v.USER_DEFINED_TASK_TYPE && Number(v.USER_DEFINED_TASK_TYPE) !== 1) {
          cal.push(Lpig);
        } else {
          if (this.createPiggingLaunchReceive) {
            // console.log(Lpig, 'lpig pre create');
            cal = cal.concat(createLaunchReceive.call(this, Lpig));
          } else {
            cal.push(Lpig);
          }
        }
      }
    });
    // console.log(cal.length, 'after foreach');
    if (this.filterByPlanStartDate) {
      cal = filterPlanStartDate(cal);
    }
    const tr: any[] = [];
    const uuids: any = {};
    // variable cal is an array of virtual calendar tasks
    // an object of keyed uuid existing tasks
    // replace in the array each virtual with an existing tasks if the uuid matches
    const calExlistMerge: any[] = this.replaceVirtualTasksWithMaterial(cal, this.exList);
    // if a task pair has one task in the date range but one outside date range
    // inlcude that in the returned set.
    // that's what this code is doing.
    const puidInDate = new Set();
    const uuidsNotInDate = new Set();
    const uuidIsInDate = new Set();
    // only materialized tasks in the current schedule are picked up
    // as the virtual date is calculated and then it checks the exList and
    // if it finds it there then it will use that one.
    // so now we also need to look for tasks not within the current schedule
    // and include those from the exList
    // filter out tasks outside of desired date ranges
    calExlistMerge.forEach((v: any) => {
      if (!(Number(v.STATUS) === Number(3))) {
        const taskCheckStartDate = moment.utc(v.START_DATE).unix();
        const taskBeginDate = moment.utc(d1).unix();
        const taskStopDate = moment.utc(d2).unix();
        if (taskCheckStartDate >= taskBeginDate && taskCheckStartDate <= taskStopDate) {
          tr.push(v);
          puidInDate.add(v.PUID);
          uuidIsInDate.add(v.UUID);
        } else {
          uuidsNotInDate.add(v.UUID);
        }
      }
    });
    // make sure if we have one pigging task the other is included regardless of date range criteria
    uuidsNotInDate.forEach((uuid: any) => {
      const checkTaskObject = uuids[uuid];
      if (checkTaskObject && puidInDate.has(checkTaskObject.PUID)) {
        tr.push(checkTaskObject);
      }
    });
    return tr.sort(this.sortDates);
  }
  public sortDates(a: any, b: any) {
    const aD = moment.utc(a.START_DATE).unix();
    const bD = moment.utc(b.START_DATE).unix();
    if (aD < bD) {
      return -1;
    }
    if (aD > bD) {
      return 1;
    }
    return 0;
  }
}
