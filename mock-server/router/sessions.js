const {omit} = require('lodash')
const randomstring = require('randomstring')

const sessions = []

const signin = (req, res)=> {
  const {email, password} = req.body
  if(!email || !password) return res.sendStatus(400).end()
  const db = require('../db/dev/db.json')
  const user = db.users.find((user)=> user.email === email && user.password === password)
  if(!user) return res.sendStatus(400).end()

  let session = sessions.find((session)=> session.userId === user.id && !session.isExpired)
  if(!session) {
    session = {
      id: randomstring.generate(64),
      userId: user.id,
      isExpired: false
    }
    sessions.push(session)
  }

  res
  .json({
    sessionId: session.id
  })
  .end()
}

const signout = (req, res)=> {
  const sessionId = extractSessionId(req.headers.authorization)

  sessions.forEach((session, i)=> {
    if(String(session.id) === String(sessionId)) {
      sessions[i].isExpired = true
    }
  })

  res
  .sendStatus(200)
  .end()
}

const myUser = (req, res)=> {
  const sessionId = extractSessionId(req.headers.authorization)
  const session = sessions.find((session)=>session.id === sessionId)
  if(!session) return res.sendStatus(401)
  
  const db = require('../db/dev/db.json')
  const user = db.users.find((user)=> user.id === session.userId)
  res
  .json(user)
  .end()
}

const isAuthorized = (req)=> {
  const sessionId = extractSessionId(req.headers.authorization)
  console.log(sessionId)
  if(!sessionId) return false
  return sessions.some((session)=> session.id === sessionId  && !session.isExpired)
}

const extractSessionId = (authorization)=> {
  return /Bearer (\w+)/.test(authorization) ? /Bearer (\w+)/.exec(authorization)[1] : null
}

module.exports = {
  signin,
  signout,
  myUser,
  isAuthorized
}
