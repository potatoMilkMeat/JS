/*
 * @Author: chenglong_wh
 * @Date: 2021-08-24 15:35:27
 * @LastEditTime: 2021-08-24 15:43:30
 * @LastEditors: chenglong_wh
 * @Description:
 */
const http = require('http')

http
  .createServer(function (req, res) {
    res.writeHead(200, {
      'Content-Type': 'text/plain',
      'Access-Token': 'chenglong123',
    })
    res.end('Hello http.js \n')
  })
  .listen(3000, '127.0.0.1')

console.log('Server running at http://127.0.0.1:3000')
