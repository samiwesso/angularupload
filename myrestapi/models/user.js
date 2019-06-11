const db = require('mongoose');

const userSchema = db.Schema({

    _id:            db.Schema.Types.ObjectId,
    firstname:      { type: String, required: true },
    mellanname:     { type: String, required: true },
    lastname:       { type: String, required: true },
    birthday:       { type: String },
    addresslinefaktura:  { type: String, required: true },
    invoicecity:    { type: String, required: true },
    invoicecountry:{ type: String, required: true },
    postnumber: { type: String, required: true },
    addressline:    { type: String, required: true },
    zipcode:        { type: String, required: true },
    city:           { type: String, required: true },

    email:          { type: String, required: true, unique: true},
    password:       { type: String, required: true },

    created:        { type: Date, default: Date.now },
    modified:       { type: Date, default: Date.now }
    
});

module.exports = db.model("User", userSchema);

