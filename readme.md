# 前言  
本人在使用node的orm中的其他orm框架时，对其查询构建器的无限层json嵌套所厌烦，因此想自己尝试做些什么。
该package通过链式拼接的方法构建sql语句，目前仅适用于mysql数据库中。

# 安装方法
```
    npm install chain-mysql-builder --save
```

# 使用方法
```
    const Builder = require('chain-mysql-builder');
    
    let query = new Builder('users').all().toSql();
    console.log(query);
    //select * from users
```

# 获取数据集
获取数据集提供了all、get、find方法。

- all() 返回表中所有字段
- get([,Array]) Array是可选字段，不传与all相同，也可以传入指定的字段数组
- find(id, [,keyName])  接受一个参数id，且表的主键名亦为id, 如表明主键不是id则需传入第二个参数

# 查询
指定需要返回的字段，select和get都可以做到，但select的参数不能为空，同时使用则以get为准。

- select(param) param可以为字符串也可以示一个数组

# where子句
条件查询语句提供了where，orWhere，whereBetween，whereIn等方法

- where，orWhere 可以接收 函数或者json对象或者两个字符串或者三个字符串

```
    let query = new Builder('users').where({'name': 'haven'}).toSql();
    let query = new Builder('users').where('name', 'haven').toSql();
    let query = new Builder('users').where('name', '=', 'haven').toSql();
    // select * from users where name = haven
    
    let query = new Builder('users').where('name', 'like', '%haven%').where('age','>',30).toSql();
    // select * from users where name like %haven% and age > 30
    
    let query = new Builder('users').where('name', 'like', '%haven%').orWhere('age','>',30).toSql();
    // select * from users where name like %haven% or ( age > 30 )
    
    // or需要两个条件同时满足
    let query = new Builder('users').where('name', 'like', '%haven%').orWhere(function (q) {
    	q.where('age','>', 30).where('gender', 'female');
    }).toSql();
    // select * from users where name like %haven% or ( age > 30 and gender = female )
```

- whereBetween(column, value1, value2) 
- whereIn(column, arr)


