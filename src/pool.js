const Builder = require('./src/builder');
const mysql = require('mysql');

class pool{

	constructor(){
		this._setting = {
			connectionLimit : 10,
			host            : 'example.org',
			user            : 'bob',
			password        : 'secret',
			database        : 'my_db'
		};

	}

	connect(setting){
		this._setting = Object.assign({}, this._setting, setting);

		this.pool = mysql.createPool(this._setting);
	}

	end(cb){
		this.pool.end((err)=>{
			cb(err);
		});
	}

	async execute(sql){
		  if(!this.pool){
		  	throw Error(`you might have not establish mysql connection`);
		  }

		  await this.pool.query(sql, (err,results, fields)=>{
		  	return new Promise(function (resolve,reject) {
				  if(err){
				  	reject(err);
				  }
				  resolve(results);
			  });
		  });
	}

	//建立连接时
	onConnection(cb){
		this.pool.on('connection', function (connection) {
			cb(connection);
		});
	}

	//当一个连接创建时
	onAcquired(cb){
		this.pool.on('acquire',(connection)=>{
			cb(connection);
		});
	}

	//请求入队时
	onEnqueue(cb){
		this.pool.on('enqueue', (connection)=>{
			cb(connection);
		});
	}

	//连接释放
	onRelease(cb){
		this.pool.on('release', (connection)=>{
			cb(connection);
		});
	}
}

module.exports = new pool();