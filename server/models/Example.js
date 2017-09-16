const mongoose = require('mongoose'),
      Schema = mongoose.Schema

const exampleSchema = new Schema({
  Name: {
    type: String,
    default: "Name"
  },
  Age: {
    type: Number,
    required: true
  },
  posted_on: {
    type: Date,
    required: true
  },
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
      }
    })

const Example = mongoose.model('issue', exampleSchema)
module.exports = Example
