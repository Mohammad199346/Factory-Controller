# Factory-Controller

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Backend API](#backend-api)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

Explore the integration of Roblox game development with a backend, creating a factory simulation. This simulation involves transporters and workstations within a virtual factory. The Roblox code utilizes HttpService to communicate with a backend script deployed on a server. The backend, manages the game state, workspace hierarchy, and updates from the Roblox game. The communication between the Roblox game and the backend is facilitated through RESTful APIs, enabling the synchronization of transporter and workstation data, as well as real-time updates of the game state. Dive into the intricacies of this cross-platform interaction, highlighting the integration of game development with backend scripting for an immersive and dynamic simulation experience.

## Features

- Seamless synchronization between Roblox environment and backend server.
- Creation, updating, retrieval, and deletion of transporter and workstation positions.
- Checks and returns information if any object is present on a given location.

## Getting Started

1. **Clone the Repository:**

2. **Setup Roblox Environment:**
- Open the Roblox Studio and load your game environment.
- Ensure transporters are set up with proper properties.

3. **Configure Backend:**
- Install required dependencies: `npm install`
- Run the backend server: `npm start`
- The server will be accessible at http://localhost:3000.


## Setting Up Node.js

Before you can run the backend server, you need to have Node.js and npm (Node Package Manager) installed on your system.

1. **Install Node.js:**
- Download and install Node.js from the official website: https://nodejs.org/
- Verify the installation by running the following commands in your terminal:
  ```
  node -v
  npm -v
  ```

2. **Install Dependencies:**
- Navigate to the project directory in your terminal.
- Run `npm install` to install the required dependencies listed in `package.json`.


## Usage

1. **Roblox Environment:**
- Transporters in the Roblox environment will interact with the backend API automatically.
- Transporters and Workstations should be set to move.

2. **Backend API:**
- The backend provides routes to create, update, retrieve, and delete transporter and workstations positions.
- Refer to the "Backend API Documentation.docx" for detailed usage.

## Contributing

Contributions are welcome! If you'd like to contribute to the project, follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m "Add feature"`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request.
