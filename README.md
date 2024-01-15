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

This project currently aims to control transporter movement in a Roblox environment through a backend API. This allows real-time coordination and control of transporters and workstations within the game world.

## Features

- Seamless synchronization between Roblox environment and backend server.
- Creation, updating, retrieval, and deletion of transporter positions.
- Collision detection to prevent transporters from passing through obstacles.

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
- Transporters should be set to move with respect to collision detection.

2. **Backend API:**
- The backend provides routes to create, update, retrieve, and delete transporter positions.
- Refer to the "Backend API Documentation.docx" for detailed usage.

## Contributing

Contributions are welcome! If you'd like to contribute to the project, follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m "Add feature"`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request.
