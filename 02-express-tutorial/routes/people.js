
const express = require('express');
const router = express.Router();

const {
    getPeople,
    createPerson,
    updatePerson,
    deletePerson
} = require('../controllers/people')

router.get('/', getPeople)
router.post('/', createPerson)
router.put('/:id', updatePerson)
router.delete('/:id', deletePerson)

module.exports = router;