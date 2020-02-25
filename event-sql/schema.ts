import { flattenData, WriteMainSQL } from '../lib/eventTasks/json2sql';

const writeSQL: any = new WriteMainSQL();

export const taskModelConfig: any = {
  columns: {
    ASSIGNEE: { defaultValue: null, excFunction: writeSQL.quoteStr },
    // ASSIGN_DATE: { defaultValue: null, excFunction: writeSQL.quoteStr },
    CREATED_BY: { defaultValue: null, excFunction: writeSQL.quoteStr },
    DAY_OF_MONTH: { defaultValue: null, excFunction: writeSQL.quoteStr },
    DAY_OF_WEEK: { defaultValue: null, excFunction: writeSQL.quoteStr },
    DESCRIPTION: { defaultValue: null, excFunction: writeSQL.quoteStr },
    // END_DATE: { defaultValue: null, excFunction: writeSQL.quoteStr },
    ENTITY_NAME: { defaultValue: null, excFunction: writeSQL.quoteStr },
    ENTITY_TYPE: { defaultValue: null, excFunction: writeSQL.formatNumber },
    EQUIPMENT_ID: { defaultValue: null, excFunction: writeSQL.quoteStr },
    EQUIPMENT_TYPE: { defaultValue: null, excFunction: writeSQL.formatNumber },
    FIELD: { defaultValue: null, excFunction: writeSQL.quoteStr },
    FREQUENCY: { defaultValue: null, excFunction: writeSQL.quoteStr },
    FREQUENCY_OFFSET: { defaultValue: null, excFunction: writeSQL.quoteStr },
    OCCURRENCE_NO: { defaultValue: null, excFunction: writeSQL.formatNumber },
    OCCURRENCE_TYPE: { defaultValue: null, excFunction: writeSQL.formatNumber },
    ORIG_ID: { defaultValue: null, excFunction: writeSQL.quoteStr },
    PLAN_ID: { defaultValue: null, excFunction: writeSQL.formatNumber },
    PUID: { defaultValue: null, excFunction: writeSQL.quoteStr },
    REGION: { defaultValue: null, excFunction: writeSQL.quoteStr },
    START_DATE: { defaultValue: null, excFunction: writeSQL.quoteStr },
    STATUS: { defaultValue: null, excFunction: writeSQL.quoteStr },
    SUB_FREQUENCY: { defaultValue: null, excFunction: writeSQL.quoteStr },
    TYPE_ID: { defaultValue: 1, excFunction: writeSQL.formatNumber },
    USER_DEFINED_TASK_TYPE: { defaultValue: 1, excFunction: writeSQL.quoteStr },
    YEARLY_ON_MONTH: { defaultValue: null, excFunction: writeSQL.formatNumber }
  },
  outputStatement: '',
  tableName: 'WORKLIST_TASKS',
  updateWhereKeys: {
    ID: { defaultValue: null, excFunction: writeSQL.formatNumber }
  }
};

export const taskModelView: any = {
  // what we send to the FE
  columns: {
    ASSIGNEE: { defaultValue: null, excFunction: writeSQL.quoteStr },
    ASSIGN_DATE: { defaultValue: null, excFunction: writeSQL.quoteStr },
    CREATED_BY: { defaultValue: null, excFunction: writeSQL.quoteStr },
    DEFERRED: { defaultValue: 0, excFunction: writeSQL.formatNumber },
    ENTITY_NAME: { defaultValue: null, excFunction: writeSQL.quoteStr },
    ENTITY_TYPE: { defaultValue: null, excFunction: writeSQL.formatNumber },
    EQUIPMENT_ID: { defaultValue: null, excFunction: writeSQL.quoteStr },
    EQUIPMENT_TYPE: { defaultValue: null, excFunction: writeSQL.formatNumber },
    FIELD: { defaultValue: null, excFunction: writeSQL.quoteStr },
    ID: { defaultValue: null, excFunction: writeSQL.formatNumber },
    META_DATA: { defaultValue: null, excFunction: writeSQL.childObj },
    ORIG_ID: { defaultValue: null, excFunction: writeSQL.quoteStr },
    ORIG_START_DATE: { defaultValue: null, excFunction: writeSQL.quoteStr },
    OVERDUE: { defaultValue: 0, excFunction: writeSQL.formatNumber },
    PLAN_ID: { defaultValue: null, excFunction: writeSQL.formatNumber },
    PUID: { defaultValue: null, excFunction: writeSQL.quoteStr },
    REGION: { defaultValue: null, excFunction: writeSQL.formatNumber },
    START_DATE: { defaultValue: null, excFunction: writeSQL.quoteStr },
    STATUS: { defaultValue: null, excFunction: writeSQL.quoteStr },
    TYPE_ID: { defaultValue: 1, excFunction: writeSQL.formatNumber },
    USER_DEFINED_TASK_TYPE: { defaultValue: 1, excFunction: writeSQL.quoteStr },
    UUID: { defaultValue: null, excFunction: writeSQL.quoteStr }
  },
  outputStatement: '',
  tableName: '',
  updateWhereKeys: {
    ID: { defaultValue: null, excFunction: writeSQL.formatNumber }
  }
};

export const planModelConfig: any = {
  columns: {
    // LINE_NAME: { defaultValue: null, excFunction: writeSQL.quoteStr },
    // LINE_SIZE_INCHES: { defaultValue: null, excFunction: writeSQL.formatNumber },
    // PIGS_COUNT: { defaultValue: null, excFunction: writeSQL.formatNumber },
    ASSIGNED_TO: { defaultValue: null, excFunction: writeSQL.quoteStr },
    CREATED_BY: { defaultValue: null, excFunction: writeSQL.quoteStr },
    END_DATE: { defaultValue: null, excFunction: writeSQL.quoteStr },
    ENTITY_NAME: { defaultValue: null, excFunction: writeSQL.quoteStr },
    ENTITY_TYPE: { defaultValue: null, excFunction: writeSQL.formatNumber },
    START_DATE: { defaultValue: null, excFunction: writeSQL.quoteStr },
    STATUS: { defaultValue: 1, excFunction: writeSQL.formatNumber }
  },
  outputStatement: '',
  tableName: 'WORKLIST_PLANS',
  updateWhereKeys: {
    ID: { defaultValue: null, excFunction: writeSQL.formatNumber }
  }
  // return this.getSubTableSql('DOC.DELIVERY.RECIPIENTS');
};
export const commentModelConfig: any = {
  columns: {
    COMMENT: { defaultValue: null, excFunction: writeSQL.quoteStr },
    COMMENT_TYPE: { defaultValue: null, excFunction: writeSQL.formatNumber },
    CREATED_BY: { defaultValue: null, excFunction: writeSQL.quoteStr },
    DISPLAY_DATE: { defaultValue: null, excFunction: writeSQL.quoteStr },
    MATERIALIZED_TASK_ID: { defaultValue: null, excFunction: writeSQL.formatNumber },
    PLAN_ID: { defaultValue: null, excFunction: writeSQL.formatNumber },
    UUID: { defaultValue: null, excFunction: writeSQL.quoteStr }
  },
  outputStatement: 'OUTPUT INSERTED.*',
  tableName: 'WORKLIST_COMMENTS',
  updateWhereKeys: {
    ID: { defaultValue: null, excFunction: writeSQL.formatNumber }
  }
  // return this.getSubTableSql('DOC.DELIVERY.RECIPIENTS');
};
export const materialTaskModelConfig: any = {
  columns: {
    EVENT_DATE: { defaultValue: null, excFunction: writeSQL.quoteStr },
    ORIG_ID: { defaultValue: null, excFunction: writeSQL.formatNumber },
    ORIG_START_DATE: { defaultValue: null, excFunction: writeSQL.quoteStr },
    TASK_ID: { defaultValue: null, excFunction: writeSQL.formatNumber },
    TYPE_ID: { defaultValue: 1001, excFunction: writeSQL.formatNumber },
    UUID: { defaultValue: null, excFunction: writeSQL.quoteStr }
  },
  outputStatement: 'OUTPUT INSERTED.*',
  tableName: 'MATERIALIZED_TASKS',
  updateWhereKeys: {
    ID: { defaultValue: null, excFunction: writeSQL.formatNumber }
  }
  // return this.getSubTableSql('DOC.DELIVERY.RECIPIENTS');
};
export const plantsEntityModelConfig: any = {
  columns: {
    ACTIVE_DIR_LOCATION_CODE: { defaultValue: null, excFunction: writeSQL.formatNumber },
    DEPT_DESCRIPTION: { defaultValue: null, excFunction: writeSQL.quoteStr },
    DEPT_ID: { defaultValue: null, excFunction: writeSQL.formatNumber },
    GAS_CONTROLLER_TEXT_NUMBER: { defaultValue: null, excFunction: writeSQL.quoteStr },
    PLANT_PHONE_NUMBER: { defaultValue: null, excFunction: writeSQL.quoteStr },
    PLANT_SUPV_EMAIL: { defaultValue: null, excFunction: writeSQL.quoteStr },
    PLANT_SUPV_NAME: { defaultValue: null, excFunction: writeSQL.quoteStr },
    REGION: { defaultValue: null, excFunction: writeSQL.quoteStr },
    WORK_LOCATION: { defaultValue: null, excFunction: writeSQL.quoteStr }
  },
  outputStatement: 'OUTPUT INSERTED.*',
  tableName: 'PLANTS_ENTITY',
  updateWhereKeys: {
    ID: { defaultValue: null, excFunction: writeSQL.formatNumber }
  }
  // return this.getSubTableSql('DOC.DELIVERY.RECIPIENTS');
};
export const metaDataModelConfig: any = {
  columns: {
    MATERIALIZED_TASK_ID: { defaultValue: null, excFunction: writeSQL.formatNumber },
    META_KEY: { defaultValue: null, excFunction: writeSQL.quoteStr },
    META_VALUE: { defaultValue: null, excFunction: writeSQL.quoteStr },
    TYPE_ID: { defaultValue: null, excFunction: writeSQL.formatNumber },
    WORKLIST_PLAN_ID: { defaultValue: null, excFunction: writeSQL.formatNumber }
  },
  outputStatement: '',
  tableName: 'TASK_META_DATA',
  updateWhereKeys: {
    MATERIALIZED_TASK_ID: { defaultValue: null, excFunction: writeSQL.formatNumber },
    META_KEY: { defaultValue: null, excFunction: writeSQL.quoteStr },
    TYPE_ID: { defaultValue: null, excFunction: writeSQL.formatNumber },
    WORKLIST_PLAN_ID: { defaultValue: null, excFunction: writeSQL.formatNumber }
  }
};
