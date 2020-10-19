const mongoose = require('mongoose');
const url = `mongodb://localhost/cyberIndigo`;
const mongooseOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true
};

module.exports.dbConnect = () => {
    mongoose.connect(url, mongooseOptions, function(mongoConError) {
        (mongoConError) ?
        console.error(mongoConError):
            console.log(`DB connected to ${url}`)
    });
    mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
}


//database connection ends