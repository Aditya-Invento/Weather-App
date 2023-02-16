const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
async function conf() {
  try {
    const con_state = mongoose?.connection?.readyState !== 1;//true = !connected || false = connected
    if(con_state) await mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PWD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DB}?retryWrites=true&w=majority`,{
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(`=> MONGO_DB: ${con_state?'ALREADY CONNECTED 🤖':'CONNECTED 🤖'}`);
    process.on('SIGINT', () => {
      mongoose.connection.close(() => {
        console.log('=> MONGO_DB: closed 💤'); 
        process.exit(0); 
      });
    });
    return '';
  } catch(err) {
    throw err;
  }
}

module.exports = conf;