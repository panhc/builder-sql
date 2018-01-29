const _utils = require('./utils.js');


class Builder {

    constructor(tableName){
        this._whereStatus = 'and';
        this._query = {
            table: tableName,
            operate: 'select',
            fields: ['*'],
            wheres: {
                and: [],
                or: []
            }
        };
    }

    select(params){
        this._query.operate = 'select';
        if(typeof params === 'string'){
            this._query.fields = [...this._query.fields,params];
        }
        if(Array.isArray(params)){
            this._query.fields = [...this._query.fields,...params];
        }

        return this;
    }

    where(...params){
        //长度为1，并且为json  {'name':'bob','age':10}
        //长度大于1，为2加等号，为三不加
        switch (params.length){
            case 1:
                let _q = params[0];

                if(typeof _q === 'function'){
                    _q.call(null,this);
                }else if(_utils.isJson(_q)){
                    let _wheres = [];
                    for(let key in _q){
                        _wheres.push(`${key} = ${_q[key]}`);
                    }
                    this._query.wheres[this._whereStatus] = [...this._query.wheres[this._whereStatus],..._wheres];
                }
                break;
            case 2:
                this._query.wheres[this._whereStatus] = [...this._query.wheres[this._whereStatus],`${params[0]} = ${params[1]}`];
                break;
            case 3:
                this._query.wheres[this._whereStatus] = [...this._query.wheres[this._whereStatus],params.join(' ')];
                break;
        }

        return this;
    }

    orWhere(buildCallback){
        this._whereStatus = 'or';
        buildCallback.call(null,this);
        this._whereStatus = 'and';
        return this;
    };

    whereBetween(filed,value1,value2){
        this._query.wheres.and.push(`${filed} between ${value1} and ${value2}`);
        return this;
    }

    whereIn(filed,arr){
        this._query.wheres.and.push(`${filed} in ( ${arr.join(',')} )`);
        return this;
    }

    all(){
        this._query.operate = 'select';
        this._query.fields = ['*'];
        return this._transfer();
    }

    get(params = []){
        params.length && (this._query.fields = params);

        return this._transfer();
    }

    find(id){
        if(typeof id !== 'string' || typeof id !== 'number'){
            throw Error('id should be table key');
        }

        this._query.wheres.and = [...this._query.wheres.and,`id = ${id}`];

        return this._transfer();
    }

    _transfer(){
        let q = [];

        switch (this._query.operate){
            case 'select':
                q.push('select',this._query.fields.join(','),'from',this._query.table);
                break;
            case 'delete':

                break;
            case 'update':

                break;
            case 'insert':

                break;
        }

        (this._query.wheres.and.length || this._query.wheres.or.length) && q.push('where');
        this._query.wheres.and.length && q.push(`${this._query.wheres.and.join(' and ')}`);

        if(this._query.wheres.or.length){
            if(this._query.wheres.and.length){
                q.push('or (');
                q.push(`${this._query.wheres.or.join(' and ')}`);
                q.push(')');
            }else {
                q.push(`${this._query.wheres.or.join(' and ')}`)
            }
        }

        return q.join(' ');
    }
}

if(require.main === module){
    let l = new Builder('actions').whereIn('id',[10,20]).orWhere(q=>{
        q.where('status','done').where('data_json','like','%11月27日%')
    }).get();

    console.log(l);
}






