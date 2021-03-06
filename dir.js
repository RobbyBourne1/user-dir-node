const express = require('express')
const mustacheExpress = require('mustache-express')
const data = require('./data.js')

const app = express()

app.use(express.static('public'))

app.engine('mustache', mustacheExpress())
app.set('views', './templates')
app.set('view engine', 'mustache')

app.get('/', (request, response) => {
  response.render('index', data)
})

app.get('/info/:name', (request, response) => {
  function findPerson(person) {
    return person.name === request.params.name
  }
  var persons = data.users.find(findPerson)
  response.render('info', persons)
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
