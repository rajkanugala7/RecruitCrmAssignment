const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required:[true,"Candidate firstname is required"]
  },
  last_name: {
    type: String,
    required:[true,"Candidate lastname is required"]
},
email: {
    type: String,
    required: [true, "Candidate email address is required"],
    unique: true,
    },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Candidate', candidateSchema);
