import app from './app.js'

const port =  process.env.PORT

app.listen(port, function() {
  console.log(`Listening on port ${port}...`)
})