const Router = require('express').Router()
const jwt = require('jsonwebtoken')
const redis = require('redis')
const { User } = require('../modelsDB/user')
const { Session } = require('../Session')
const { v4: uuidv4 } = require('uuid')
const config = require('config')

const redisClient = redis.createClient({
  host: config.get('host'),
  port: config.get('port'),
  password: config.get('password')
})

function auth(req, res, next) {
  const token = req.header('Authorization').replace('Bearer', '').trim()
  const sessionToken = req.header('sessiontoken')
  let decoded;

  try {
    decoded = jwt.verify(token, "super_secret_key")
  } catch (error) {
    res.status(400).send('BAD REQUEST')
    return
  }

  User.findById(decoded.id, async (err, doc) => {
    if (err) {
      res.status(401).send('UNAUTHORIZED')
      return
    }

    /**
     * If the session has expired, create a new session; 
     * otherwise, add the existing session to the request(req)
     */
    let isExit;
    await isSessionExistAndSetSession(req, sessionToken)
      .then((isSessionExist) => {
        if (!isSessionExist) {
          createSession(req, doc)
        }
      })
      .catch((err) => {
        isExit = true

        if (err === 'Invalid session token') {
          res.status(401).send('Invalid session token')
          return
        }
        res.status(500).send('INTERNAL SERVER ERROR')
      })
      if (isExit) return; 

    req.user = doc
    next()
  })
}

Router.post('/auth', auth, (req, res) => {
  res.setHeader('sessiontoken', req.sessionId)
  res.json({
    user: req.user,
    token: req.sessionId,
  })
})

function isSessionExistAndSetSession(req, sessionToken) {
  return new Promise((resolve, reject) => {
    if (!sessionToken) {
      reject('Invalid session token')
    }

    redisClient.get(sessionToken, (err, user) => {
      if (err) {
        reject(err)
      }
      
      if (!user) {
        resolve(false)
      }

      req.session = new Session(sessionToken, user)
      req.sessionId = sessionToken
      resolve(true)
    })
  })
}

function createSession(req, user) {
  let sessionId = uuidv4()

  // Create session object
  const currentSession = new Session(sessionId, user)

  // Add session and session id to the request 
  req.session = currentSession
  req.sessionId = sessionId

  // Save session in redis
  try {
    currentSession.save(redisClient)
  } catch (error) {
    return error
  }
}

exports.Router = Router