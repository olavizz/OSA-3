const express = require('express')
var morgan = require('morgan')
const app = express()
app.use(express.json())
const cors = require('cors')
app.use(cors())

morgan.token('data', function(req, res) {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))
let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456"
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523"
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345"
  },
  {
    id: 4,
    name: "Mary Poppendick",
    number: "39-23-6423122"
  }
]

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
  const time = new Date()
  response.send(
    `
    <h4>Phonebook has info for ${persons.length} people</h4>
    <h4>${time}</h4>
  `
  )
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = persons.find(note => note.id === id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
  
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  console.log(persons)
  persons = persons.filter(person => person.id !== id)
  console.log(persons)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const isName = persons.some(person => person.name === body.name)

  if (isName) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  console.log(request.body)
  var number = Math.floor(Math.random() * 1000)
  const person = {
    id: number,
    name: body.name,
    number: body.number
  }

  console.log(number)
  console.log(person)
  persons = persons.concat(person)
  response.json(person)
})
const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)