const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const Project = require('./models/Project');
mongoose.connect('mongodb://localhost:27017/dashboard')
.then(function() {
console.log('Conectat la MongoDB!');
})
.catch(function(err) {
console.error('Eroare conectare MongoDB:', err);
});


const PORT = 3000;

app.use(express.json());
app.use(cors());

// Prima ruta: raspunde la GET /
app.get('/', function(req, res) {
  res.json({ message: 'Serverul functioneaza!' });
});

app.get('/api/projects', async function(req, res) {
try {
const projects = await Project.find();
res.json(projects);
} catch (err) {
res.status(500).json({ error: 'Eroare ' + err });
}
});

// POST /api/projects - adauga un proiect nou
app.post('/api/projects', async function(req, res) {
try {
const newProject = new Project({
title: req.body.title,
tech: req.body.tech,
done: req.body.done || false,
});
const saved = await newProject.save();
res.status(201).json(saved);
} catch (err) {
res.status(400).json({ error: err.message });
}
});

// GET /api/projects/:id - returneaza un singur proiect dupa id
app.get('/api/projects/:id', async function(req, res) {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: 'Eroare ' + err });
  }
});

// DELETE /api/projects/:id - sterge un proiect dupa id
app.delete('/api/projects/:id', async function(req, res) {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Eroare ' + err });
  }
});

// PUT /api/projects/:id - actualizeaza un proiect existent
app.put('/api/projects/:id', async function(req, res) {
  try {
    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/stats - returneaza statistici despre proiecte
// app.get('/api/stats', function(req, res) {
//   const total = projects.length;
//   const done = projects.filter(p => p.done).length;
//   const pending = projects.filter(p => !p.done).length;

//   res.json({ total, done, pending });
// });

// // Porneste serverul
app.listen(PORT, function() {
  console.log('Server pornit pe http://localhost:' + PORT);
});