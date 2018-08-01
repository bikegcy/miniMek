const express = require('express');
const router = express.Router();

// Hero Model
const Units = require('../../models/Unit');

// @route   GET api/Mechs
// @desc    Get all Mechs
// @access  Public
router.get('/', (req, res) => {
  Units.find()
    .then(Units => res.json(Units))
});

// @router   POST api/Unit
// desc      Post an unit info
// @access   Public
router.post('/', (req, res) => {
  const newUnit = new Units({
    name:         req.body.name,
    affiliation:  req.body.affiliation,
    icon:         req.body.icon,
    color:        req.body.color,
    damageTeam:  req.body.damageTeam,
    tankTeam:    req.body.tankTeam,
    supportTeam:  req.body.supportTeam
  });
  newUnit.save()
    .then(unit => res.json(unit))
    .catch(err => res.json(err));
});

// @route   PUT api/unit
// @desc    Put certain unit
// @access  Public
router.put('/:id', (req, res) => {
  const newUnit = new Units({
    _id:         req.body._id,
    name:        req.body.name,
    affiliation: req.body.affiliation,
    icon:        req.body.icon,
    color:       req.body.color,
    damageTeam:  req.body.damageTeam,
    tankTeam:    req.body.tankTeam,
    supportTeam:  req.body.supportTeam
  });

  Units.update(
    {_id: req.body._id},
    newUnit
  )
    .then(()=> {
      Units.find()
        .then(units => res.json(units))
    })
    .catch(err => res.status(404).json({success: false}));
});


module.exports = router;