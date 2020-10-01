class Session {
  constructor() {
    this.usedDate = {}
    this.sessionId = null
  }

  set(obj) {
    this.usedDate = obj
  }

  save(client) {
    if(this.sessionId) {
      client.set(this.sessionId, JSON.stringify(this.userDate))
      client.expire(this.sessionId, 60 * 60 * 2)
    }
  }

  delete(client) {
    client.del(this.sessionId)
  }
}

exports.Session = Session