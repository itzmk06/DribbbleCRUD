const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    src: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    likes: {
      type:String,
      required: true,
    },
    views: {
      type:String,

        required: true,
    },
    authorImage: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 0, 
        max: 5,
    },
}, {
    timestamps: true, 
});

const User = mongoose.model('User', userSchema);

module.exports = User;
