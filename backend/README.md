# ExpressJS Kanban Backend

RESTful API backend for the Kanban Board application, built with Node.js, Express, and MySQL.

## Prerequisites

- **Node.js** (v18+)
- **MySQL** (Database server)
- **NPM** (Package manager)

## Installation & Setup

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Environment Configuration**
    Create a `.env` file in the `backend` root directory (copy from `.env.example`).
    ```bash
    cp .env.example .env
    ```
    Edit the `.env` file with your database credentials and secret keys:
    ```env
    PORT=3000
    NODE_ENV=development
    DB_HOST=localhost
    DB_PORT=3306  # Adjust if your MySQL uses a different port
    DB_NAME=db_kanban_app
    DB_USER=root
    DB_PASSWORD=your_password # Biasanya kosong
    JWT_SECRET=your_secure_secret_key
    JWT_EXPIRES_IN=7d
    ```

3.  **Database Setup**
    *   Create a MySQL database named `db_kanban_app` (or whatever you set in `DB_NAME`).
    *   Run migrations to create tables:
        ```bash
        npm run migrate
        ```

4.  **Run Server**
    *   **Development:** `npm run dev` (uses nodemon)
    *   **Production:** `npm start`

## API Endpoints

Base URL: `http://localhost:3000/api`

### Auth (`/auth`)
*   `POST /register` - Register a new user
    *   Body: `{ "name": "...", "email": "...", "password": "..." }`
*   `POST /login` - Login user
    *   Body: `{ "email": "...", "password": "..." }`

### Boards (`/boards`) - Requires Auth
*   `GET /` - Get all boards for the logged-in user
*   `POST /` - Create a new board
    *   Body: `{ "title": "...", "description": "...", "backgroundColor": "..." }`
*   `GET /:id` - Get board details
*   `PUT /:id` - Update board
*   `DELETE /:id` - Delete board

### Lists (`/lists`) - Requires Auth
*   `GET /?boardId=:id` - Get all lists for a specific board
*   `POST /` - Create a new list
    *   Body: `{ "title": "...", "boardId": 1, "position": 0 }`
*   `PUT /:id` - Update list
*   `PUT /:id/move` - Move list position
    *   Body: `{ "position": 1 }`
*   `DELETE /:id` - Delete list

### Cards (`/cards`) - Requires Auth
*   `GET /?listId=:id` - Get all cards for a specific list
*   `POST /` - Create a new card
    *   Body: `{ "title": "...", "listId": 1 }`
*   `GET /:id` - Get card details
*   `PUT /:id` - Update card
*   `PUT /:id/move` - Move card to another list or position
    *   Body: `{ "listId": 2, "position": 0 }`
*   `PUT /:id/complete` - Toggle completion status
*   `DELETE /:id` - Delete card

## Scripts

*   `npm run dev`: Start dev server
*   `npm start`: Start production server
*   `npm run migrate`: Run database migrations
*   `npm run lint`: Lint code
