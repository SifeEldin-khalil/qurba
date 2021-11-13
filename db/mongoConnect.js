const config           = require('../config/index.config');
const mongoose         = require('mongoose');
const dbURI            = config.dotEnv.MONGO_URI;

module.exports = ()=>{
  //database connection
  mongoose.Promise = global.Promise;
  mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });


  // When successfully connected
  mongoose.connection.on('connected', function () {
      console.log('Mongoose default connection open to ' + dbURI);
  });

  // If the connection throws an error
  mongoose.connection.on('error',function (err) {
    console.log('Mongoose default connection error: ' + err);
      console.log('=> if using local mongodb: make sure that mongo server is running \n'+
      '=> if using online mongodb: check your internet connection \n');
  });

  // When the connection is disconnected
  mongoose.connection.on('disconnected', function () {
      console.log('Mongoose default connection disconnected');
  });

  // If the Node process ends, close the Mongoose connection
  process.on('SIGINT', function() {
      mongoose.connection.close(function () {
          console.log('Mongoose default connection disconnected through app termination');
          process.exit(0);
      });
  });
}