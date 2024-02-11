const mongoose = require('mongoose');

// Make sure the following line properly defines the connection string
const uri = `mongodb+srv://iamabhijithabhi01:admin123@cluster1.xt54a0p.mongodb.net/zezone?retryWrites=true&w=majority`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch(error => {
    console.error('Error connecting to MongoDB Atlas:', error.message);
  });
