const jwt = require('jsonwebtoken')

module.exports = (context) => {
  if (context.req && context.req.headers.authorization) {
    const token = context.req.headers.authorization.split('Bearer ')[1]
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      context.auth = decodedToken
    })
  }

  return context
}