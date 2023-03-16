const mongoose = require('mongoose')
const mongooseFuzzySearching = require('@rowboat/mongoose-fuzzy-searching')

const acronymSchema = new mongoose.Schema({
  acronym: {
    type: String,
    required: true
  },
  definition: {
    type: String,
    required: true
  }
})

acronymSchema.plugin(mongooseFuzzySearching, { fields: ['acronym'] })

module.exports = mongoose.model('Acronym', acronymSchema)