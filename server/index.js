const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Date (temporar in memorie, vom folosi MongoDB mai tarziu)
const projects = [
  { id: 1, title: "Pagina Personala", tech: "HTML, CSS", done: true },
  { id: 2, title: "Calculator Buget", tech: "JS", done: true },
  { id: 3, title: "Dashboard React", tech: "React", done: false },
  { id: 4, title: "API Meteo", tech: "React, API", done: false },
];

// Prima ruta: raspunde la GET /
app.get('/', function(req, res) {
  res.json({ message: 'Serverul functioneaza!' });
});

// GET /api/projects - returneaza toate proiectele
app.get('/api/projects', function(req, res) {
  res.json(projects);
});

// POST /api/projects - adauga un proiect nou
app.post('/api/projects', function(req, res) {
  const newProject = {
    id: projects.length + 1,
    title: req.body.title,
    tech: req.body.tech,
    done: req.body.done || false,
  };

  projects.push(newProject);
  res.status(201).json(newProject);
});

// GET /api/projects/:id - returneaza un singur proiect dupa id
app.get('/api/projects/:id', function(req, res) {
  const projectId = parseInt(req.params.id, 10);
  const project = projects.find(p => p.id === projectId);

  if (!project) {
    return res.status(404).json({ error: 'Not found' });
  }

  res.json(project);
});

// DELETE /api/projects/:id - sterge un proiect dupa id
app.delete('/api/projects/:id', function(req, res) {
  const projectId = parseInt(req.params.id, 10);
  const index = projects.findIndex(p => p.id === projectId);

  if (index === -1) {
    return res.status(404).json({ error: 'Not found' });
  }

  projects.splice(index, 1);
  res.json({ message: 'Deleted' });
});

// PUT /api/projects/:id - actualizeaza un proiect existent
app.put('/api/projects/:id', function(req, res) {
  const projectId = parseInt(req.params.id, 10);
  const project = projects.find(p => p.id === projectId);

  if (!project) {
    return res.status(404).json({ error: 'Not found' });
  }

  if (req.body.title !== undefined) project.title = req.body.title;
  if (req.body.tech !== undefined) project.tech = req.body.tech;
  if (req.body.done !== undefined) project.done = req.body.done;

  res.json(project);
});

// GET /api/stats - returneaza statistici despre proiecte
app.get('/api/stats', function(req, res) {
  const total = projects.length;
  const done = projects.filter(p => p.done).length;
  const pending = projects.filter(p => !p.done).length;

  res.json({ total, done, pending });
});

// Porneste serverul
app.listen(PORT, function() {
  console.log('Server pornit pe http://localhost:' + PORT);
});