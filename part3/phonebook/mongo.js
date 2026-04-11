require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
  name:  {
    type: String,
    minLength: [3, "Name must be at least 3 characters"]
  },
  number: String
}, {collection: 'person'})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: 'Blini',
  number: '123',
})

person.save().then(() => {
  console.log('person saved!')
  mongoose.connection.close()
})

Person.find({"name": "Blini"}).then(result => {
  result.forEach(person => {
    console.log(person)
  })

  mongoose.connection.close()
})
