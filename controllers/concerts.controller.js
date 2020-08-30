const Concert = require('../models/concert.model');
const Seats = require('../models/seat.model');
const sanitize = require('mongo-sanitize');

exports.getAll = async (req, res) => {
  try {
    const concerts = await Concert.find();
    for (let singleConcert of concerts) {
      let seats = await Seats.find({ day: singleConcert.day });
      console.log(seats.length);
      singleConcert.freeTickets = singleConcert.tickets - seats.length;
    }
    res.json(concerts);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

  exports.getId = async (req, res) => {

    try {
      const dep = await Concert.findById(req.params.id);
      if(!dep) res.status(404).json({ message: 'Not found' });
      else res.json(dep);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  
  };

  exports.post = async (req, res) => {

    try {
  
      const clean = sanitize(req.body);
      const { performer, genre, price, day, image, freeTickets } = clean;
      const newConcert = new Concert({ performer, genre, price, day, image, freeTickets });
      await newConcert.save();
      res.json({ message: 'OK' });
      
    } catch(err) {
      res.status(500).json({ message: err });
    }
  
  };

  exports.putId = async (req, res) => {

    const { performer, genre, price, day, image, freeTickets } = req.body;

  try {
    await Concert.updateOne({ _id: req.params.id }, { $set: { performer, genre, price, day, image, freeTickets }});
    res.json({ message: 'OK, You changed:' + dep });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

};

exports.deletedId = async (req, res) => {

    try {
      const dep = await(Concert.findById(req.params.id));
      if(dep) {
        await Concert.deleteOne({ _id: req.params.id });
        res.json({ message: 'OK, You deleted:' + dep });
      }
      else res.status(404).json({ message: 'Not found...' });
    }
      catch(err) {
        res.status(500).json({ message: err });
      }
  };
