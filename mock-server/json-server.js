const path = require('path')
const jsonServer = require('json-server')
const cookieParser = require('cookie-parser')
const {signin, signout, myUser, isAuthorized} = require('./router/sessions')

const server = jsonServer.create()
const middlewares = jsonServer.defaults({bodyParser: true, noCors: false})
server.use(middlewares)
server.use(cookieParser())

server.post('/sessions/signin', signin)
server.post('/sessions/signout', signout)
server.get('/my/user', myUser)

const authExclusions = [
  {method: 'GET', path: '/db'},
  {method: 'GET', path: '/__rules'},
  {method: 'POST', path: '/sessions/signin'},
  {method: 'POST', path: '/sessions/signout'}
]

server.use((req, res, next) => {
  const isSkip = authExclusions.some(({method, path})=> method === req.method && path === req.path)
  if (isSkip || isAuthorized(req)) {
    return next()
  }
  res.sendStatus(401).end()
})

const router = jsonServer.router(path.join(__dirname, 'db/dev/db.json'))
server.use(router)

server.listen(1337, () => {
  console.log('JSON Server is running')
})
