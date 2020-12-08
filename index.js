const Post = require('./models/post')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const staticAsset = require('static-asset')
const config = require('./config')
const mongoose = require('mongoose')

// database
mongoose.Promise = global.Promise
mongoose.set('debug', config.IS_PRODUCTION)
mongoose.connection
  .on('error', (error) => console.log(error))
  .on('close', () => console.log('Database connection closed!!!'))
  .once('open', () => {
    const info = mongoose.connection
    console.log(`Connected to ${info.host}:${info.port}/${info.name}`)
  })

mongoose.connect(config.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

// sets && uses
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(staticAsset(path.join(__dirname)))
app.use(express.static(path.join(__dirname)))
app.use(
  '/public/javascripts',
  express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist'))
)

//routers
app.get('/', (req, res) => {
  Post.find({}, (error, posts) => {
    console.log(posts)
    res.render('index', { title: 'oleh title', posts })
  })
})

app.get('/create', (req, res) => {
  res.render('create', { title: 'oleh title' })
})

app.post('/create', (req, res) => {
  const { title, body } = req.body
  Post.create({
    title,
    body,
  }).then((post) => console.log(post))
  res.redirect('/')
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.render('error', {
    message: error.message,
    error: !config.IS_PRODUCTION ? error : {},
    title: error.status,
  })
})

app.listen(config.PORT, () => {
  console.log(`Example app listening at http://localhost:${config.PORT}`)
})
