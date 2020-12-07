const database = require('./database')
const app = require('./app')
const config = require('./config')

database()
  .then((info) => {
    console.log(`Connected to ${info.host}:${info.port}/${info.name}`)
    app.listen(config.PORT, () => {
      console.log(`Example app listening at http://localhost:${config.PORT}`)
    })
  })
  .catch((error) => {
    console.error('Unable to connect to database', error)
    process.exit(1)
  })
