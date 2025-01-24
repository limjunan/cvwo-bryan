# Gossip for CVWO

This is a forum application built with React and TypeScript for the frontend, and Go with GORM for the backend. It allows users to register, log in, and participate in discussions by creating threads and posting comments. The application also supports tag-based filtering and pagination for threads.

## Features

- User authentication (login and registration)
- Create, read, update, and delete threads
- Post and delete comments
- Tag-based filtering of threads
- Pagination for threads
- Responsive design with Tailwind CSS

## Technologies Used

### Frontend

- React
- TypeScript
- Tailwind CSS
- React Router
- Axios

### Backend

- Go
- GORM (Go ORM)

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine
- Go installed on your machine

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/forum-app.git
   cd forum-app
   ```

2. Install the frontend and backend dependencies:

   ```sh
   npm install
   go mod tidy
   ```

### Running the Application

1. Start the backend server and seed the database:

   ```sh
   go run backend/cmd/main.go -seed
   ```

2. Start the frontend development server:

   ```sh
   cd frontend
   npm start
   ```

3. Open your browser and navigate to http://localhost:3000.

### API Endpoints

#### User Routes

- `POST /register` - Register a new user
- `POST /login` - Login a user

#### Thread Routes

- `GET /threads` - Get all threads
- `GET /threads/{id}` - Get a specific thread by ID
- `POST /threads` - Create a new thread
- `PUT /threads/{id}` - Update a thread by ID
- `DELETE /threads/{id}` - Delete a thread by ID

#### Comment Routes

- `GET /threads/{id}/comments` - Get all comments for a specific thread
- `GET /threads/{id}/comments/{commentId}` - Get a specific comment by ID
- `POST /threads/{id}/comments` - Create a new comment for a specific thread
- `PUT /threads/{id}/comments/{commentId}` - Update a comment by ID
- `DELETE /threads/{id}/comments/{commentId}` - Delete a comment by ID

#### Tag Routes

- `GET /tags` - Get all tags
- `GET /tags/{id}` - Get a specific tag by ID
- `POST /tags` - Create a new tag
- `PUT /tags/{id}` - Update a tag by ID
- `DELETE /tags/{id}` - Delete a tag by ID

### Authentication

The application uses token-based authentication, based on Username only. The token is stored in localStorage and is used to authenticate API requests.

### Routing

The application uses react-router-dom for client-side routing. The main routes are:

/login - Login page
/register - Registration page
/forum - Main forum page

### Pagination

Pagination is implemented in the Pagination component. The ThreadPage component handles the display of threads and pagination controls.

### Tag Filtering and Search

Tag filtering and Search is implemented in the Forum component. Users can filter threads by selecting tags from the sidebar, and search by using the searchbar in the header.
