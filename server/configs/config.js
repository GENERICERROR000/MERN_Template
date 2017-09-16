module.exports = {
  'database': 'mongodb://localhost/CHANGE', // TODO: Make sure to change this
  'port': process.env.PORT || 3000,
  'headers': (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, UPDATE, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'x-access-token, issue_id')
    next()
  }
}
