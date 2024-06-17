import http from 'node:http'

const server = http.createServer((req, res) => {
  res.
  setHeader('Content-Type', 'application/json').
  end('Ola Mundo')
})

server.listen(8080)