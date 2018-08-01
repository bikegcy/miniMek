const express = require('express');
const router = express.Router();

// Hero Model
const Hero = require('../../models/Hero');

// @route   GET api/heroes
// @desc    Get all heroes
// @access  Public
router.get('/', (req, res) => {
  Hero.find()
    .sort({ date: -1})
    .then(heroes => res.json(heroes))
});

// @router   POST api/heroes
// desc      Post an hero info
// @access   Public
router.post('/', (req, res) => {
  const newHero = new Hero({
    name:        req.body.name,
    age:         req.body.age,
    role:        req.body.role,
    affiliation: req.body.affiliation,
    weapon:      req.body.weapon,
    damage:      req.body.damage,
    health:      req.body.health,
    mech:        req.body.mech
  });
  newHero.save()
    .then(hero => res.json(hero))
    .catch(err => res.json(err));
});

// @route   PUT api/heroes
// @desc    Put certain heroes
// @access  Public
router.put('/:id', (req, res) => {
  const newHero = new Hero({
    _id:         req.body._id,
    name:        req.body.name,
    age:         req.body.age,
    role:        req.body.role,
    affiliation: req.body.affiliation,
    weapon:      req.body.weapon,
    damage:      req.body.damage,
    health:      req.body.health,
    mech:        req.body.mech
  });

  Hero.update(
    {_id: req.body._id},
    newHero
  )
    .then(()=> {
      Hero.find()
        .sort({date: -1})
        .then(heroes => res.json(heroes))
  })
  .catch(err => res.status(404).json({success: false}));
});

// @route   DELETE api/heroes
// @desc    Delete certain hero
// @access  Public
router.delete('/:id', (req, res) => {
  Hero.findById(req.params.id)
    .then(hero => hero.remove()
      .then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success: false}));
});


module.exports = router;