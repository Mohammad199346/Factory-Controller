const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json()); // for parsing application/json

// Read the initial game state from file, or set it to an empty object if the file does not exist.
let gameState = {};
const gameStateFilePath = 'gameState.json';

function readGameState() {
  try {
    let rawData = fs.readFileSync(gameStateFilePath);
    gameState = JSON.parse(rawData);
    console.log('Game state loaded successfully');
  } catch (error) {
    console.log('No existing game state or file corrupt. Starting with a new state.');
    gameState = {}; // Reset to a default state if needed
  }
}

// Function to write the game state to the file
function writeGameState() {
  fs.writeFileSync(gameStateFilePath, JSON.stringify(gameState, null, 2), 'utf8');
}

// Immediately invoke the read function to load the game state when the server starts.
readGameState();

// Endpoint to update the game state
app.post('/updateGameState', (req, res) => {
  gameState = req.body; // assuming the entire game state is sent in the request body
  fs.writeFileSync(gameStateFilePath, JSON.stringify(gameState, null, 2));
  res.send({ message: 'Game state updated successfully' });
});

// Endpoint to retrieve the game state
app.get('/getGameState', (req, res) => {
  res.json(gameState);
});

// Initialize an empty array to store workspace data
let storedWorkspaceData = [];

app.post('/Workspace', (req, res) => {
  const receivedWorkspaceData = req.body;

  // Assuming receivedWorkspaceData is an array of item names
  // Process the received data as needed
  console.log('Received Workspace data:', receivedWorkspaceData);

  // Store the received data in the array
  storedWorkspaceData = receivedWorkspaceData;

  // Respond with a success message
  res.json({ message: 'Workspace data received successfully' });
});

app.get('/Workspace', (req, res) => {
  // Retrieve and send the stored workspace data in the response
  res.json({ storedWorkspaceData });
});

// Initialize an empty array to store transporter names
let storedTransporterNames = [];

// Endpoint to update the transporter names
app.post('/Workspace/Transporters', (req, res) => {
  const receivedTransporterNames = req.body;

  // Assuming receivedTransporterNames is an array of transporter names
  // Process the received data as needed
  console.log('Received Transporters data:', receivedTransporterNames);

  // Store the received data in the array
  storedTransporterNames = receivedTransporterNames;

  // Respond with a success message
  res.json({ message: 'Transporters data received successfully' });
});

// Endpoint to retrieve the transporter names
app.get('/Workspace/Transporters', (req, res) => {
  // Retrieve and send the stored transporter names in the response
  res.json({ storedTransporterNames });
});


// CRUD operations for transporters
// Read all transporters
app.get('/transporters', (req, res) => {
  // We convert the gameState object into an array of transporter objects.
  const transportersArray = Object.entries(gameState).map(([key, value]) => {
    return {
      name: key,
      position: value.position
    };
  });
  
  res.status(200).json(transportersArray);
});

// Endpoint to retrieve the specific transporter data
app.get('/Workspace/Transporters/:id', (req, res) => {
  const transporterId = req.params.id;

  if (gameState[transporterId]) {
    // Retrieve and send the data for the specific transporter in the response
    const transporterData = {
      name: transporterId,
      position: gameState[transporterId].position || 'Position not available'
    };
    res.json(transporterData);
  } else {
    res.status(404).json({ message: 'Transporter not found' });
  }
});

// Read a single transporter by ID
app.get('/transporters/:id', (req, res) => {
  const transporterId = req.params.id;
  const transporter = gameState.transporters ? gameState.transporters[transporterId] : null;
  if (transporter) {
    res.json(transporter);
  } else {
    res.status(404).json({ message: 'Transporter not found' });
  }
});

// Create a new transporter
app.post('/transporters', (req, res) => {
  const transporter = req.body;
  if (!transporter || !transporter.id || !transporter.position) {
    res.status(400).json({ error: 'Transporter data with id and position is required' });
    return;
  }
  if (!gameState.transporters) {
    gameState.transporters = {};
  }
  gameState.transporters[transporter.id] = transporter;
  writeGameState();
  res.status(201).json({ message: 'Transporter created successfully', id: transporter.id });
});

// Update an existing transporter by ID
app.put('/Workspace/Transporters/:id', (req, res) => {
  const transporterId = req.params.id;
  const { position } = req.body;

  if (!gameState[transporterId]) {
    res.status(404).json({ message: 'Transporter not found' });
    return;
  }

  // Only update if the position is provided in the body
  if (position) {
    gameState[transporterId].position = position;

    // Save the updated gameState to the file
    fs.writeFileSync(gameStateFilePath, JSON.stringify(gameState, null, 2));
    res.json({ message: 'Transporter updated successfully' });
  } else {
    // Respond with an error if position is not provided
    res.status(400).json({ error: 'Position is required' });
  }
});

/*app.put('/Workspace/Transporters/:id', (req, res) => {
  const transporterId = req.params.id;
  const { position } = req.body;

  if (gameState[transporterId]) {
    // Update the position of the specific transporter
    gameState[transporterId].position = position;

    // Save the updated gameState to the file
    fs.writeFileSync(gameStateFilePath, JSON.stringify(gameState, null, 2));

    // Respond with a success message
    res.json({ message: `Position for ${transporterId} updated successfully` });
  } else {
    res.status(404).json({ message: 'Transporter not found' });
  }
});*/



// Delete a transporter by ID
app.delete('/transporters/:id', (req, res) => {
  const transporterId = req.params.id;
  if (!gameState.transporters || !gameState.transporters[transporterId]) {
    res.status(404).json({ message: 'Transporter not found' });
    return;
  }
  delete gameState.transporters[transporterId];
  writeGameState();
  res.json({ message: 'Transporter deleted successfully' });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});



/*const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json()); // for parsing application/json

// Read the initial game state from file, or set it to an empty object if the file does not exist.
let gameState = {};
const gameStateFilePath = 'gameState.json';

function readGameState() {
  try {
    let rawData = fs.readFileSync(gameStateFilePath);
    gameState = JSON.parse(rawData);
    console.log('Game state loaded successfully');
  } catch (error) {
    console.log('No existing game state or file corrupt. Starting with a new state.');
    gameState = {}; // Reset to a default state if needed
  }
}

// Function to write the game state to the file
function writeGameState() {
  fs.writeFileSync(gameStateFilePath, JSON.stringify(gameState, null, 2), 'utf8');
}

// Immediately invoke the read function to load the game state when the server starts.
readGameState();

// Endpoint to update the hierarchy structure
app.post('/updateHierarchy', (req, res) => {
  const hierarchyStructure = req.body;
  traverseHierarchy(hierarchyStructure);
  writeGameState();
  res.send({ message: 'Hierarchy structure updated successfully' });
});

// Recursive function to traverse the hierarchy structure
function traverseHierarchy(node) {
  if (typeof node === 'object') {
    for (const key in node) {
      if (node.hasOwnProperty(key)) {
        const item = node[key];
        gameState[key] = item; // Update the game state with the new information
        traverseHierarchy(item);
      }
    }
  }
}

// Endpoint to get all items in the Workspace folder
app.get('/Workspace', (req, res) => {
  const workspaceItems = gameState.Workspace;
  if (workspaceItems) {
    res.json(workspaceItems);
  } else {
    res.status(404).json({ message: 'Workspace folder not found' });
  }
});

// Endpoint to get all items in the Workspace/Transporters folder
app.get('/Workspace/Transporters', (req, res) => {
  const transportersFolder = gameState.Workspace && gameState.Workspace.Transporters;
  if (transportersFolder) {
    res.json(transportersFolder);
  } else {
    res.status(404).json({ message: 'Transporters folder not found' });
  }
});

// Endpoint to get the position of a specific transporter
app.get('/Workspace/Transporters/:transporterName', (req, res) => {
  const transporterName = req.params.transporterName;
  const transporter = gameState.Workspace && gameState.Workspace.Transporters && gameState.Workspace.Transporters[transporterName];
  if (transporter) {
    res.json({ position: transporter.position });
  } else {
    res.status(404).json({ message: 'Transporter not found' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});*/