require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/acronyms'
mongoose.connect(DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to MongoDB.'));

// Re-populates the database with initial records.
const acronymsSeed = require('./seeds/acronyms')
const Acronym = require('./models/acronym')
db.once('open', async () => {
  await Acronym.deleteMany({})
  await Acronym.insertMany(acronymsSeed)
  .then(() => {
      console.log("Database has been populated.")
  }).catch(function(error) {
      console.log(error)
  });
});

app.use(express.json())

const acronymsRouter = require('./routes/acronyms')
app.use('/acronym', acronymsRouter)

// API base route.
app.get("/", (req, res) => {
  res.send('Backend App');
});

const PORT = process.env.PORT || 3000;
app.listen(3000, () => console.log(`Server is running on port ${PORT}...`))
