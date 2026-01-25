# FastAPI and React Project

This repository contains a full-stack web application built using FastAPI for the backend and React with Vite for the frontend.

## Project Structure

```
fastApi/
├── Backend/
│   ├── main.py
│   ├── __pycache__/
├── Frontend/
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── README.md
│   ├── vite.config.js
│   ├── public/
│   └── src/
│       ├── App.jsx
│       └── main.jsx
```

### Backend

The backend is built using [FastAPI](https://fastapi.tiangolo.com/), a modern, fast (high-performance), web framework for building APIs with Python 3.7+.

#### Features
- **CRUD Operations**: The backend provides endpoints for creating, reading, updating, and deleting items.
- **CORS Middleware**: Configured to allow cross-origin requests from any origin.

#### Endpoints
- **POST /items**: Create a new item.
- **GET /items**: Retrieve all items.
- **PUT /items/{item_id}**: Update an existing item by ID.
- **DELETE /items/{item_id}**: Delete an item by ID.

#### Running the Backend
1. Navigate to the `Backend` directory:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   pip install fastapi uvicorn
   ```
3. Start the development server:
   ```bash
   uvicorn main:app --reload
   ```
4. The API will be available at `http://127.0.0.1:8000`.

### Frontend

The frontend is built using [React](https://reactjs.org/) and [Vite](https://vitejs.dev/), a fast build tool for modern web projects.

#### Features
- **React 19**: The latest version of React for building user interfaces.
- **Vite**: Fast development and build tool.
- **ESLint**: Configured for linting JavaScript and React code.

#### Running the Frontend
1. Navigate to the `Frontend` directory:
   ```bash
   cd Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. The application will be available at `http://localhost:5173`.

## How to Contribute

1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Description of changes"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License.