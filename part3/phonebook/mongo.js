const mongoose = require('mongoose')

const url = `mongodb+srv://andihaziri0_db_user:hCaNnNlbhW5w8kpL@cluster0.iqlkewk.mongodb.net/phonebook?appName=Cluster0`

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