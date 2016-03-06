#mongodb数据库操作

mongod --dbpath mongo_store 起服务器
mongo 进入交互
use urldb 切换到该数据库
db.urlCollction.save 新建表
db.getCollection('urlCollction').inset({origin: 'http://www.baidu.com',target:'http://www.baidu.com/abcde'}) 插入表数据