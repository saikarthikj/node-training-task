const http = require('http');
const url = require('url');
const fs = require('fs');
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    const urlObject = url.parse(req.url);
    switch(req.method){
        case 'GET':
        case 'DELETE':
            queryRequest(res, urlObject);
        break;
        case 'POST':
            req.on('data', data=>{
                postRequest(JSON.parse(data.toString()), urlObject, res);
            })
            break;
    }
});
server.listen(3000);

function postRequest(body = null, url, res){
    if(body && body.path){
        switch(url.pathname){
            case '/writefile':
                writeFile(body.path, JSON.stringify(body.data), res);
            break;
            case '/sync/writefile':
                writeFileSync(body.path, JSON.stringify(body.data), res);
            break;
        }
    } else {
        onError('Path is required', res);
        res.end();
    }
}

function queryRequest(res, url){
    let queryPath = url.query;
    if(queryPath){
        queryPath = queryPath.split('&').find(item => item.indexOf('path=') >= 0 );
    }
    if(queryPath){
        const path = queryPath.split('=')[1];
        switch(url.pathname){
            case '/readfile':
                readFile(path, res);
            break;
            case '/deletefile':
                deleteFile(path, res);
            break;
            case '/sync/readfile':
                readFileSync(path, res);
            break;
            case '/sync/deletefile':
                deleteFileSync(path, res);
            break;
        }
    } else {
        onError('Path is required', res);
        res.end();
    }
}
function onError(error, res) {
    res.writeHead(500, error, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({error}));
}

function readFile(path, res) {
    fs.readFile(path,(err, data)=>{
        if(err && err.code === 'ENOENT'){
            onError('No such file or directory', res);
        } else {
            res.write(data);
        }
        res.end()
    });
}
function writeFile(path, data = '', res) {
    fs.writeFile(path, data,(err, data)=>{
        if (err) {
            onError(err, res);
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify({
                message: 'Successfully writen content to file'
            }));
        }
        res.end()
    });
}
function deleteFile(path, res) {
    fs.unlink(path, (err)=>{
        if(err && err.code === 'ENOENT'){
            onError('No such file or directory', res);
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify({
                message: 'Deleted successfully'
            }));
        }
        res.end()
    });
}
function readFileSync(path, res) {
    try{
        const onfileread = fs.readFileSync(path);
        res.write(onfileread.toString());
        res.end();
    } catch(error) {
        if(error && error.code === 'ENOENT'){
            onError('No such file or directory', res);
        } else {
            onError(error, res);
        }
        res.end();
    }
}
function deleteFileSync(path, res) {
    try{
        fs.unlinkSync(path);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({
            message: 'Deleted successfully'
        }));
        res.end();
    } catch(error) {
        if(error && error.code === 'ENOENT'){
            onError('No such file or directory', res);
        } else {
            onError(error, res);
        }
        res.end();
    }
}

function writeFileSync(path, data = '', res) {
    try{
        fs.writeFileSync(path, data);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({
            message: 'Successfully writen content to file'
        }));
        res.end();
    } catch(error) {
        onError(error, res);
        res.end();
    }
}
