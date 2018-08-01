const express = require('express');
const router = express.Router();

// Hero Model
const Mechs = require('../../models/Mechs');

// @route   GET api/Mechs
// @desc    Get all Mechs
// @access  Public
router.get('/', (req, res) => {
  Mechs.find()
    .sort({ date: -1})
    .then(Mechs => res.json(Mechs))
});

// @router   POST api/Mechs
// desc      Post an hero info
// @access   Public
router.post('/', (req, res) => {
  const newMechs = new Mechs({
    name:        req.body.name,
    model:  req.body.model,
    weight:      req.body.weight,
    classType: req.body.classType
  });
  newMechs.save()
    .then(Mechs => res.json(Mechs))
    .catch(err => res.json(err));
});

// @route   PUT api/mechs
// @desc    Put certain mech
// @access  Public
router.put('/:id', (req, res) => {
  const newMech = new Mechs({
    _id:         req.body._id,
    name:        req.body.name,
    model:       req.body.model,
    weight:      req.body.weight,
    classType:   req.body.classType
  });

  Mechs.update(
    {_id: req.body._id},
    newMech
  )
    .then(()=> {
      Mechs.find()
        .sort({date: -1})
        .then(mechs => res.json(mechs))
    })
    .catch(err => res.status(404).json({success: false}));
});

// @route   DELETE api/Mechs
// @desc    Delete certain Mechs
// @access  Public
router.delete('/:id', (req, res) => {
  Mechs.findById(req.params.id)
    .then(Mechs => Mechs.remove()
      .then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success: false}));
});

module.exports = router;