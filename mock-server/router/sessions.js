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
      userId: user.id,
      requestToken: randomstring.generate(64),
      isExpired: false
    }
    sessions.push(session)
  }

  res
  .cookie('userId', user.id)
  .cookie('requestToken', session.requestToken)
  .sendStatus(200)
  .end()
}

const signout = (req, res)=> {
  const {userId} = req.cookies
  if(!userId) return res.sendStatus(400)

  sessions.forEach((session, i)=> {
    if(String(session.userId) === String(userId)) {
      sessions[i].isExpired = true
    }
  })

  res
  .clearCookie('userId')
  .clearCookie('requestToken')
  .sendStatus(200)
  .end()
}

const isAuthorized = (req)=> {
  const {userId, requestToken} = req.cookies
  if(!userId || !requestToken) return false
  return sessions.some((session)=> 
    String(session.userId) === String(userId)
      && session.requestToken === requestToken
      && !session.isExpired
  )
}

module.exports = {
  signin,
  signout,
  isAuthorized
}
