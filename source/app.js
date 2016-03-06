// var express = require('express');
// var app = express();

// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/urldb');

// app.use(express.static(__dirname + '/public'));  
// app.listen(8080);

// var Urls = mongoose.model('urlCollection', {
//     source: String,
//     target: String
// });

// app.get('*', function(req, res){
//     res.sendfile(__dirname + '/public/index.html'); 
// });

// app.get('/index', function(req, res){
//     Urls.findOne({source: req.url}, function (err, doc) {
//         if (err) {
//             console.log('isExsiterror:' + err);
//         }
//         else {
//             res.json(doc);
//         }
//     });
// });

// app.post('/index', function(req, res){
//     Urls.create({
//         source: req.body.url,
//         target: req.body.url
//     }, function (err, doc) {
//         if (err) {
//             res.send(err);
//         }
//         Urls.find(function (err, docs) {
//             if (err) {
//                 res.send(err);
//             }
//             res.json(docs);
//         });
//     });
// });


var http = require('http');
var fs = require('fs');

var mongodb = require('mongodb');

var MongoClient = mongodb.MongoClient;

var DB_CONN_STR = 'mongodb://localhost:27017/urldb';

var server = http.createServer(function(req, res){
    var stream = fs.createReadStream('./public/index.html');
    stream.pipe(res);
});
server.listen(8080);

var insertData = function (db, data, callback) {
    var collection = db.collection('urlCollection');
    collection.insert(data, function (err, result) {
        if (err) {
            console.log('err' + err);
            return;
        }
        callback(result);
    });
};

var queryData = function (db, sourceUrl, callback) {
    var collection = db.collection('urlCollection');
    var result = collection.findOne({source: sourceUrl}, function (err, doc) {
        if (err) {
            console.log('isExsiterror:' + err);
        }
        else {
            callback(doc);
        }
    });
};

MongoClient.connect(DB_CONN_STR, function (err, db) {
    var data = {source: 'http://www.qq.com1', target: 'http://www.qq.com1/short'};
    insertData(db, data, function (result) {
        console.log(result);
        db.close();
    });
    // queryData(db, data.source, function (result) {
    //     console.log(result);
    //     db.close();
    // });
});

function getUrlPre(url) {
    var length = url.length;
    var pos = length;
    var queryIndex = url.indexOf('?');
    if (queryIndex !== -1) {
        pos = queryIndex;
    }
    else {
        var index = url.indexOf('/', 1);
        (index !== -1) && (pos = index)
    }
    (pos > length || pos < 0) && (pos = length)
    return url.substr(0, pos);
}
function generateShortUrl(url, length) {
    var path = '';
    var arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    for (var i = length - 1; i >= 0; i--) {
        var pos = Math.round(Math.random() * (arr.length - 1));
        path += arr[pos]
    }
    return getUrlPre(url) + path;
}


