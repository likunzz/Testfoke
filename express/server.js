const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/ESP32';
mongoose.connect(mongoURI);

const dataSchema = new mongoose.Schema({
  temperature: Number,
  humidity: Number,
  timestamp: { type: Date, default: Date.now }
});

const Data = mongoose.model('Data', dataSchema);

app.post('/api/data', async (req, res) => {
  const newData = new Data(req.body);
  try {
    await newData.save();
    res.status(200).send('Data saved');
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/api/data', async (req, res) => {
  try {
    const data = await Data.find().sort({ timestamp: -1 }).limit(10);
    res.json(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});