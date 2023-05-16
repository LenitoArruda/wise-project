const mongoose = require('mongoose');

async function startDB(){
    await mongoose.connect('mongodb+srv://lenitoarruda:478811901@dbwise.bsq9fvz.mongodb.net/test');
}

module.exports = startDB;