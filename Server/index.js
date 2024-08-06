const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./Models/Todo');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get('/get', (req, res) => {
  TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.put('/update/:id', (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndUpdate({ _id: id }, { done: true }, { new: true })
    .then(result => res.json(result))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndDelete({ _id: id })
    .then(result => res.json(result))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.post('/add', (req, res) => {
  const { task } = req.body;
  TodoModel.create({
    task: task,
    done: false, // Initialize the 'done' property
  })
    .then(result => res.json(result))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.listen(3001, () => {
  console.log('server is running on 3001');
});
