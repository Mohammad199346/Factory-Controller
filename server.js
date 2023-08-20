const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

const objectPositions = {};

app.get('/transporters', (req, res) => {
  const positions = Object.values(objectPositions);
  res.status(200).json(positions);
});

app.get('/transporters/:id', (req, res) => {
  const transporterId = req.params.id;
  const position = objectPositions[transporterId];

  if (position) {
    res.status(200).json(position);
  } else {
    res.status(404).json({ message: 'Transporter not found' });
  }
});

app.post('/transporters', (req, res) => {
  const transporter = req.body;

  if (!transporter || !transporter.name) {
    res.status(400).json({ error: 'Transporter data is required' });
    return;
  }

  const { name, location } = transporter;
  objectPositions[name] = { name, location };

  res.status(201).json({ message: 'Transporter created successfully', id: name });
});

/*app.post('/transporters', (req, res) => {
  const transporter = req.body;

  if (!transporter || !transporter.name || !transporter.location || !transporter.color) {
    res.status(400).json({ error: 'Transporter data is required, including name, location, and color' });
    return;
  }

  const { name, location, color } = transporter;
  objectPositions[name] = { name, location, color };

  res.status(201).json({ message: 'Transporter created successfully', id: name });
});*/


app.put('/transporters/:id', (req, res) => {
  const transporterId = req.params.id;
  const { name, location } = req.body;

  if (!objectPositions[transporterId]) {
    res.status(404).json({ message: 'Transporter not found' });
    return;
  }

  objectPositions[transporterId] = { name, location };

  res.json({ message: 'Transporter updated successfully' });
});

app.delete('/transporters/:id', (req, res) => {
  const transporterId = req.params.id;

  if (!objectPositions[transporterId]) {
    res.status(404).json({ message: 'Transporter not found' });
    return;
  }

  delete objectPositions[transporterId];

  res.json({ message: 'Transporter deleted successfully' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
