const Candidate = require('../models/Candidate');

const addCandidate = async (req, res) => {
  const { first_name, last_name, email } = req.body;
  const user_id = req.user.id;

  const candidate = new Candidate({ first_name, last_name, email, user_id });
  await candidate.save();

  res.status(201).json({ message: 'Candidate added successfully' });
};

const getCandidates = async (req, res) => {
  const user_id = req.user.id;
  const candidates = await Candidate.find({ user_id });

  res.json(candidates);
};

module.exports = { addCandidate, getCandidates };