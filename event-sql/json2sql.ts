
export function flattenData(data: any) {
  // this function takes a json object and recursively 'flattens' into a
  // namespace object example: {a: 1, key : {b: 1}} becomes { a: 1, 'key.b' : 1 }
  // an array is left as an array
  // it's designed to be called from Array.prototype.map
  function flatten(obj: any, i: any, org: any) {
    const flatObj = {};
    recurseF(obj, flatObj);
    return flatObj;
  }
  let nsp = '';
  function recurseF(obj: any, flatObj: any) {
    const k = Object.keys(obj);
    let nL;
    if (nsp) {
      nL = nsp.split('.');
      const keys = Object.keys(flatObj);
    }
    for (let cnt = 0, len = k.length; cnt < len; cnt++) {
      const i = k[cnt];

      if (obj[i] instanceof Object && !Array.isArray(obj[i])) {
        if (nsp === '') {
          nsp = i;
        } else {
          nsp += '.' + i;
        }
        recurseF(obj[i], flatObj);
      } else {
        const nLL = nsp.split('.');
        let tnsp;
        if (nLL.length <= 1 && nsp === '') {
          tnsp = i.toUpperCase();
        } else {
          tnsp = (nsp + '.' + i).toUpperCase();
        }
        if (Array.isArray(obj[i])) {
          flatObj[tnsp] = { type: i, _ID: flatObj['DOC._ID'], data: obj[i] };
        } else {
          flatObj[tnsp] = obj[i];
        }
      }
      if (nL && cnt === k.length - 1) {
        nsp = nL.slice(0, nL.length - 1).join('.');
      }
    }
  }
  return data.map(flatten);
}

// *************************************************
//
// writeMainSQL - instantiate function to create SQL
export class WriteMainSQL {

  public rowLimit = 500;
  public configSQL: any = {};
  public data = [];
  public sqlMap = {};
  public lineSegments = [];

  constructor() {
    this.configSQL.tableName = '';
    this.configSQL.outputStatement = '';
  }

  public formatNumber = (v: number) => {
    if (v == null) {
      return String(null);
    } else {
      return v;
    }
  }
  public quoteStr = (v: string) => {
    if (v == null) {
      return String(null);
    }
    v = String(v);
    if (v && v.replace) {
      v = v.replace(/'/g, '');
      return `'` + v + `'`;
    } else {
      return `''`;
    }
  }
  public formatDate = (v: string) => {
    if (v == null) {
      return String(null);
    }
    v = String(v);
    if (v && v.replace) {
      v = v.replace(/'/g, '');
      return `'` + v + `'`;
    } else {
      return `''`;
    }
  }
  public setConfigSQL = (config: any) => {
    this.configSQL = config;
  }
  public getConfigSQL = () => {
    return this.configSQL;
  }

  // var quoteStr = this.quoteStr;
  // date formater is same as quote string

  public formatInsertSQL = (obj: any) => {
    const tr = '(';
    const arr: any = [];
    const cKeys = Object.keys(this.configSQL.columns);
    cKeys.forEach((i, v) => {
      if (obj[i] || Number(obj[i] === 0)) {
        arr.push(this.configSQL.columns[i].excFunction.call(null, obj[i]));
      } else {
        arr.push(this.configSQL.columns[i].excFunction.call(null, this.configSQL.columns[i].defaultValue));
      }
    });
    return '(' + arr.join(',') + ')';
  }
  public formatUpdateSQL = (obj: any) => {
    let sql = 'UPDATE ' + this.configSQL.tableName + ' SET ';
    const arr: any = [];
    const cKeys = Object.keys(this.configSQL.columns);
    const oKeys = Object.keys(obj);
    cKeys.forEach((v: string) => {
      if (oKeys.indexOf(v) > -1 && (obj[v] || Number(obj[v] === 0))) {
        arr.push([v.replace(/\./g, '_'), this.configSQL.columns[v].excFunction.call(null, obj[v])]);
      } else if (oKeys.indexOf(v) > -1) {
        arr.push([v.replace(/\./g, '_'), this.configSQL.columns[v].excFunction.call(
          null, this.configSQL.columns[v].defaultValue
        )]);
      }
    });
    const arr2 = arr.map((x: any[]) => {
      return x.join(' = ');
    });
    sql += arr2.join(',');
    sql += ' ' + this.configSQL.outputStatement + ' ';
    sql += ' WHERE ';
    const wKeys = Object.keys(this.configSQL.updateWhereKeys);
    wKeys.forEach((v: string) => {
      if (obj[v]) {
        sql += v + ' = ' + this.configSQL.updateWhereKeys[v].excFunction.call(null, obj[v]) + ' AND ';
      }
    });
    sql = sql.substring(0, sql.length - 4);
    return sql;
  }
  public formatSelectSQL = (obj: any) => {
    let sql = 'SELECT * FROM ' + this.configSQL.tableName + ' WHERE ';
    const arr: any = [];
    const cKeys = Object.keys(this.configSQL.columns);
    const oKeys = Object.keys(obj);
    cKeys.forEach((v: string) => {
      if (oKeys.indexOf(v) > -1 && obj[v]) {
        arr.push([v.replace(/\./g, '_'), this.configSQL.columns[v].excFunction.call(null, obj[v])]);
      } else if (oKeys.indexOf(v) > -1) {
        arr.push([v.replace(/\./g, '_'), this.configSQL.columns[v].excFunction.call(
          null, this.configSQL.columns[v].defaultValue
        )]);
      }
    });
    const arr2 = arr.map((x: any[]) => {
      return x.join(' = ');
    });
    sql += arr2.join(' AND ');
    return sql;
  }

  public array2Updates = (data: any) => {
    const len = data.length;
    // max t sql row insert is 1000.  to be carefull if there are more than 500
    // records we will split into chuncks with max of 500
    const rowLimit = this.rowLimit;
    const queries = Math.ceil(len / rowLimit);
    let sql = '';
    const cKeys = Object.keys(this.configSQL.columns);
    for (let i = 0; i < queries; i++) {
      const dataSeqment = data.slice(i * rowLimit, ((i + 1) * rowLimit));
      sql += dataSeqment.map((ii: any) => {
        return this.formatUpdateSQL.call(this, ii);
      }, this) + ' ';
    }
    return sql;
  }
  public array2Select = (data: any) => {
    const len = data.length;
    // max t sql row insert is 1000.  to be carefull if there are more than 500
    // records we will split into chuncks with max of 500
    const rowLimit = this.rowLimit;
    const queries = Math.ceil(len / rowLimit);
    let sql = '';
    const cKeys = Object.keys(this.configSQL.columns);
    for (let i = 0; i < queries; i++) {
      const dataSeqment = data.slice(i * rowLimit, ((i + 1) * rowLimit));
      sql += dataSeqment.map((ii: any) => {
        return this.formatSelectSQL.call(this, ii);
      }, this) + ';';
    }
    return sql;
  }
  public array2MetaUpdates = (data: any) => {
    const len = data.length;
    // max t sql row insert is 1000.  to be carefull if there are more than 500
    // records we will split into chuncks with max of 500
    const rowLimit = this.rowLimit;
    const queries = Math.ceil(len / rowLimit);
    const metaConfig = this.getConfigSQL();
    let sqlA: any;
    const cKeys = Object.keys(this.configSQL.columns);
    for (let i = 0; i < queries; i++) {
      const dataSeqment = data.slice(i * rowLimit, ((i + 1) * rowLimit));
      sqlA = dataSeqment.map((ii: any) => {
        let str: string = ``;
        str += this.formatUpdateSQL.call(this, ii);
        str += `  IF @@ROWCOUNT = 0  `;
        // if there is no update insert new meta data row
        str += this.array2Inserts.call(this, [ii]);
        str += ` `;
        return str;
      }, this);
    }
    return sqlA;
  }
  public formatInsertColumnNames = (columns: any) => {
    const cKeys = Object.keys(columns);
    const nameArray: string[] = [];
    for (let i = 0, len = cKeys.length; i < len; i++) {
      nameArray.push(columns[cKeys[i]].altColumnName || cKeys[i]);
    }
    return cKeys.toString().replace(/\./g, '_');
  }
  public array2Inserts = (data: any) => {
    // CONFIG THIS FUNCTION TO BE REUABLE BY CONFIG SETTINGS TO RESUSE //
    const len = data.length;
    // max t sql row insert is 1000.  to be carefull if there are more than 500
    // records we will split into chuncks with max of 500
    const rowLimit = this.rowLimit;
    const queries = Math.ceil(len / rowLimit);
    const tr = [];
    const cKeys = Object.keys(this.configSQL.columns);
    for (let i = 0; i < queries; i++) {
      const nameString: string = this.formatInsertColumnNames(this.configSQL.columns);
      let sql = 'INSERT INTO ' + this.configSQL.tableName + ' (' + nameString + ') ';
      sql += this.configSQL.outputStatement + ' VALUES ';
      const dataSeqment = data.slice(i * rowLimit, ((i + 1) * rowLimit));

      sql += dataSeqment.map((ii: any) => {
        return this.formatInsertSQL.call(this, ii);
      }, this).join(',') + ';';
      tr.push(sql);
    }
    return tr;
  }

  public getInsertSQL = (config: any, data: any) => {
    this.data = data;
    this.setConfigSQL(config);
    return this.array2Inserts(data);
  }
  public getUpdateSQL = (config: any, data: any) => {
    this.data = data;
    this.setConfigSQL(config);
    return this.array2Updates(data);
  }
  public getUpdateMetaSQL = (config: any, data: any) => {
    this.data = data;
    this.setConfigSQL(config);
    return this.array2MetaUpdates(data);
  }

  // this.getRecipientsSQL = function() {
  //   this.configSQL.columns = {
  //     'DOC._ID': { defaultValue: null, excFunction: this.quoteStr },
  //     'TYPE': { defaultValue: null, excFunction: this.quoteStr },
  //     'RECIPIENT': { defaultValue: null, excFunction: this.quoteStr },
  //     'SENTTS': { defaultValue: null, excFunction: this.formatDate }
  //   }
  //   this.configSQL.tableName = 'ENV_BLOW_RECIPIENTS';
  //   return this.getSubTableSql('DOC.DELIVERY.RECIPIENTS');
  // }
  public getSubTableSql = (propName: any) => {
    const tr: any[] = [];
    this.data.forEach((i: any) => {
      if (i[propName] && i[propName].data && i[propName].data.length > 0) {
        const id = i[propName]._ID;
        const a = i[propName].data.map((v: any) => {
          v['DOC._ID'] = id;
          return v;
        }, this);
        tr.push(a);
      }
    });
    let ftr = [].concat.apply([], tr);
    ftr = ftr.map((i: any) => {
      const n: any = {};
      const k = Object.keys(i);
      k.forEach((x) => {
        const name = this.columnNames(x);
        n[name] = i[x];
      });
      return n;
    }, this);
    const sql = this.array2Inserts(ftr);
    return sql;
  }
  public columnNames = (s: string) => {
    return s.toUpperCase();
  }
}
