# MERN Family Server

This is the backend server for managing family relationships using the MERN stack. It provides RESTful API endpoints for managing people and their relationships.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed
- MongoDB database

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/uparkalau/mern-family-server.git
   cd mern-family-server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root and configure your MongoDB connection:
  ( by default database link provided )
   ```env
   DB_USERNAME=your_db_username
   DB_PASSWORD=your_db_password
   ```

4. Start the server:

   ```bash
   npm start
   ```

The server should now be running on `http://localhost:8000`.

## API Endpoints

- `/api/people`
  - `GET`: Fetch all people with their relationships
  - `POST`: Create a new person
- `/api/people/:id`
  - `GET`: Fetch a specific person by ID
  - `PUT`: Update a person by ID
  - `DELETE`: Delete a person by ID
- `/api/people/:id/relationships`
  - `GET`: Fetch relationships of a person by ID
- `/api/relationships`
  - `POST`: Create a new relationship
- `/api/relationships/:id`
  - `DELETE`: Delete a relationship by ID

## Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
