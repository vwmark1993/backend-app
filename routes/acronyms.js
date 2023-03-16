const express = require('express')
const router = express.Router()
const Acronym = require('../models/acronym')

// Retrieves a paginated query of acronyms for a search string. The search results are queried using fuzzy search.
router.get('/', async (req, res) => {
  try {
    const page = req.query.page
    const limit = req.query.limit
    const search = req.query.search

    const skipValue = page * limit >= 0 ? page * limit : 0

    const acronyms = await Acronym.fuzzySearch(search).skip(skipValue).limit(limit)
    res.json(acronyms)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Creates a new acronym record using a given acronym and definition.
router.post('/', async (req, res) => {
  try {
    const acronym = new Acronym({
      acronym: req.body.acronym,
      definition: req.body.definition
    })

    const newAcronym = await acronym.save()
    res.status(201).json(newAcronym)
  } catch(err) {
    res.status(400).json({ message: err.message })
  }
})

// Updates an existing acronym by ID using new values provided for acronym and definition.
router.patch('/:id', async (req, res) => {
  try {
    let existingAcronym = await Acronym.findById(req.params.id)

    if (req.body.acronym) {
      console.log(req.body.acronym)
      existingAcronym.acronym = req.body.acronym
    }

    if (req.body.definition) {
      existingAcronym.definition = req.body.definition
    }

    const updatedAcronym = await existingAcronym.save()
    res.json(updatedAcronym)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deletes an existing acronym by ID.
router.delete('/:id', async (req, res) => {
  try {
    await Acronym.findByIdAndRemove(req.params.id)
    res.json({ message: 'Deleted acronym.' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router