const http = require('http');
const fs = require('fs');
const express = require('express');

const hostname = 'localHost';
const port = 8000;

let app = express();
app.use(express.static('./'));

let server = app.listen(port, function () {
  console.log(`express app listening at ${hostname}:${port}`);
})

/*
let html = fs.readFileSync('./index.html', 'utf8', (err, data) => {
  if (err) {
    return 'an error'
  } else {
    // console.log(data);
    return data
  };
});

// let handleRequest = (request, response) => {
//   response.writeHead(200) = fs.readFile('./index.html', null, (err, data) => {
//   if (err) {
//     response.writeHead(404);
//     response.write('aaaah!  An error!!!');
//   } else {
//     response.write();
//   }
//   response.end();
// });
// }

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end(html);
});

server.listen(port, hostname, () => {
  console.log(`Server running at ${hostname}:${port}`);
})

*/
