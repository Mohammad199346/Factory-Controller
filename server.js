const express = require('express');
const fs = require('fs');
const app = express();
//const port = 3000;
const port = process.env.PORT || 3000;
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

// Initialize an empty array to store Construction Zone elements
let storedConstructionZoneElements = [];

// Initialize an empty array to store FactoryFloor elements
let storedFactoryFloorElements = [];

// Endpoint to update the workspace data
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

// Endpoint to update the ConstructionZone Elements
app.post('/Workspace/ConstructionZone', (req, res) => {
  const receivedConstructionZoneElements = req.body;

  // Assuming receivedTransporterNames is an array of transporter names
  // Process the received data as needed
  console.log('Received ConstructionZone data:', receivedConstructionZoneElements);

  // Store the received data in the array
  storedConstructionZoneElements = receivedConstructionZoneElements;

  // Respond with a success message
  res.json({ message: 'ConstructionZone data received successfully' });
});

// Endpoint to update the FactoryFloor Elements
app.post('/Workspace/ConstructionZone/FactoryFloor', (req, res) => {
  const receivedFactoryFloorElements = req.body;

  // Assuming receivedTransporterNames is an array of transporter names
  // Process the received data as needed
  console.log('Received FactoryFloor data:', receivedFactoryFloorElements);

  // Store the received data in the array
  storedFactoryFloorElements = receivedFactoryFloorElements;

  // Respond with a success message
  res.json({ message: 'FactoryFloor data received successfully' });
});

//Endpoint to retreive workspace data
app.get('/Workspace', (req, res) => {
  // Retrieve and send the stored workspace data in the response
  res.json({ storedWorkspaceData });
});

// Endpoint to retrieve the ConstructionZone data
app.get('/Workspace/ConstructionZone', (req, res) => {
  // Retrieve and send the stored constructionzone names in the response
  res.json({ storedConstructionZoneElements });
});

// Endpoint to retrieve the FactoryFloor data
app.get('/Workspace/ConstructionZone/FactoryFloor', (req, res) => {
  // Retrieve and send the stored factoryfloor names in the response
  res.json({ storedFactoryFloorElements });
});

// Initialize an empty array to store transporter names
let storedTransporterNames = [];

// Endpoint to update the transporter names
app.post('/Workspace/ConstructionZone/FactoryFloor/Transporters', (req, res) => {
  const receivedTransporterNames = req.body;

  // Assuming receivedTransporterNames is an array of transporter names
  // Process the received data as needed
  console.log('Received Transporters data:', receivedTransporterNames);

  // Store the received data in the array
  storedTransporterNames = receivedTransporterNames;

  // Respond with a success message
  res.json({ message: 'Transporters data received successfully' });
});

// Initialize an empty array to store workstation names
let storedWorkstationNames = []

// Endpoint to update the workstation names
app.post('/Workspace/ConstructionZone/FactoryFloor/Workstations', (req, res) => {
  const receivedWorkstationsNames = req.body;

  // Assuming receivedWorkstationNames is an array of workstation names
  // Process the received data as needed
  console.log('Received Workstations data:', receivedWorkstationsNames);

  // Store the received data in the array
  storedWorkstationNames = receivedWorkstationsNames;

  // Respond with a success message
  res.json({ message: 'Workstations data received successfully' });
});

// CRUD operations for transporters
// Endpoint to create a new transporter
/*app.post('/transporters', (req, res) => {
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
});*/

// Endpoint to retrieve all transporters
app.get('/Workspace/ConstructionZone/FactoryFloor/Transporters', (req, res) => {
  // Retrieve and send the stored transporter names in the response
  res.json({ storedTransporterNames });
});

// Endpoint to retreive all transporters
/*app.get('/transporters', (req, res) => {
  // We convert the gameState object into an array of transporter objects.
  const transportersArray = Object.entries(gameState).map(([key, value]) => {
    return {
      name: key,
      position: value.position
    };
  });
  
  res.status(200).json(transportersArray);
});*/

// Endpoint to retrieve the specific transporter
app.get('/Workspace/ConstructionZone/FactoryFloor/Transporters/:id', (req, res) => {
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
/*app.get('/transporters/:id', (req, res) => {
  const transporterId = req.params.id;
  const transporter = gameState.transporters ? gameState.transporters[transporterId] : null;
  if (transporter) {
    res.json(transporter);
  } else {
    res.status(404).json({ message: 'Transporter not found' });
  }
});*/

// Endpoint to update an existing transporter by ID
app.put('/Workspace/ConstructionZone/FactoryFloor/Transporters/:id', (req, res) => {
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

// CRUD operations for workstations
// Endpoint to create a new workstation
/*app.post('/workstations', (req, res) => {
  const workstation = req.body;
  if (!workstation || !workstation.id || !workstation.position) {
    res.status(400).json({ error: 'Workstation data with id and position is required' });
    return;
  }
  if (!gameState.workstation) {
    gameState.workstation = {};
  }
  gameState.workstation[workstation.id] = workstation;
  writeGameState();
  res.status(201).json({ message: 'Workstation created successfully', id: workstation.id });
});*/

// Endpoint to retrieve the all workstations
app.get('/Workspace/ConstructionZone/FactoryFloor/Workstations', (req, res) => {
  // Retrieve and send the stored workstation names in the response
  res.json({ storedWorkstationNames });
});

// Read all worksations
/*app.get('/workstations', (req, res) => {
  // We convert the gameState object into an array of workstation objects.
  const workstationsArray = Object.entries(gameState).map(([key, value]) => {
    return {
      name: key,
      position: value.position
    };
  });
  
  res.status(200).json(workstationsArray);
});*/

// Endpoint to retrieve the specific workstation
app.get('/Workspace/ConstructionZone/FactoryFloor/Workstations/:id', (req, res) => {
  const workstationId = req.params.id;

  if (gameState[workstationId]) {
    // Retrieve and send the data for the specific workstation in the response
    const workstationData = {
      name: workstationId,
      position: gameState[workstationId].position || 'Position not available'
    };
    res.json(workstationData);
  } else {
    res.status(404).json({ message: 'Workstation not found' });
  }
});

// Read a single workstation by ID
/*app.get('/workstations/:id', (req, res) => {
  const workstationId = req.params.id;
  const workstation = gameState.workstations ? gameState.workstations[workstationId] : null;
  if (workstation) {
    res.json(workstation);
  } else {
    res.status(404).json({ message: 'Workstation not found' });
  }
});*/

// Endpoint to update an existing workstation by ID
app.put('/Workspace/ConstructionZone/FactoryFloor/Workstations/:id', (req, res) => {
  const workstationId = req.params.id;
  const { position } = req.body;

  if (!gameState[workstationId]) {
    res.status(404).json({ message: 'Workstation not found' });
    return;
  }

  // Only update if the position is provided in the body
  if (position) {
    gameState[workstationId].position = position;

    // Save the updated gameState to the file
    fs.writeFileSync(gameStateFilePath, JSON.stringify(gameState, null, 2));
    res.json({ message: 'Workstation updated successfully' });
  } else {
    // Respond with an error if position is not provided
    res.status(400).json({ error: 'Position is required' });
  }
});

// Operations to check presence of transporters and worksations on a specific location
let xValue = null;
let zValue = null;

// Route to set x and z values from Postman
app.post('/setLocation', (req, res) => {
  const { x, z } = req.body;

  if (x !== undefined && z !== undefined) {
    xValue = x;
    zValue = z;
    res.json({ message: 'Location values set successfully' });
  } else {
    res.status(400).json({ error: 'Invalid request data' });
  }
});

// Route to get x and z values for Roblox
app.get('/getLocation', (req, res) => {
  res.json({ x: xValue, z: zValue });
});

app.listen(port, () => {
  //console.log(`Server listening at http://localhost:${port}`);
  console.log(`Server listening on port ${port}`);

});


