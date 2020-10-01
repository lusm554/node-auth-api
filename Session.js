class Session {
  constructor(sessionId, user) {
    this.sessionId = sessionId
    this.userData = user
  }

  save(client) {
    if (this.sessionId) {
      client.set(this.sessionId, JSON.stringify(this.userData))
      client.expire(this.sessionId, 60 * 60 * 2)
    }
  }

  delete(client) {
    client.del(this.sessionId)
  }
}

exports.Session = Session