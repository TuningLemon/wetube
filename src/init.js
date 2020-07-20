import "@babel/polyfill";
import dotenv from "dotenv";
import app from "./app";
import "./db";
import "./models/Video";
import "./models/Comment";
import "./models/User";

dotenv.config();
// const app = require('./app');

// eslint-disable-next-line prefer-destructuring
const PORT = process.env.PORT;
// const PORT = process.env.PORT || 4000;

const handleListening = () => {
  console.log(`Listening on: http://localhost:${PORT}`);
};

// mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});
// mongoose.set('useUnifiedTopology', true);
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
// we're connected!

// hello world
// mongoose.set('useFindAndModify', false);
// mongoose.connect('mongodb://localhost:27017/we-tube', {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
// MongoClient.connect('mongodb://localhost:${PORT}',{useUnifiedTopology:true});
// mongoose.connect('mongodb://localhost:27017/we-tube', {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
// const url = 'mongodb://localhost:27017/we-tube';
// const client = new MongoClient(url, {useUnifiedTopology: true});

app.listen(PORT, handleListening);
