# WebBooks

WebBooks is a web application designed to manage and organize your book collection efficiently. It provides a user-friendly interface to add, view, and categorize books, making it easier to keep track of your reading list.

## Features

- **Add New Books**: Easily add new books to your collection with details like title, description, author, and publication date.
- **View Book List**: Browse through your entire book collection in a structured manner.
- **Add New Authors**: Browse through your entire author collection in a structured manner.
- **Update Books & Authors**: Update the books and authors independently.
- **Delete Books & Authors**: Delete the books and authors. Deleting an author deletes the associated books as well.

## Live Demo

Experience the application live at: [webbooks-gamma.vercel.app](https://webbooks-gamma.vercel.app)

## Technologies Used

- **Frontend**: Developed using [Next.js](https://nextjs.org/), and [Apollo Client](https://www.apollographql.com/docs/react)
- **Backend**: Developed using [Apollo Server](https://www.apollographql.com/docs/apollo-server), an open-source spec-compliant GraphQL server.
- **Deployment**: Frontend deployed on [Vercel](https://vercel.com/), and backend and postgres database deployed on [Render](https://render.com/)

## Prerequisites

Before running the application locally, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (has been tested only on v20.x, but fairly recent versions should work)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) package manager
- [PostgreSQL](https://www.postgresql.org/)

## Getting Started

Follow these steps to set up the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/shubhamprasad0/webbooks.git
cd webbooks
```

### 2. Set Up the Backend

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

#### Configure the Database

1. Create a `.env` file in the `backend` directory with the following content:

   ```env
   NODE_ENV=development
   DATABASE_URL="your postgres connection url"
   ```

2. Start the backend server:

   ```bash
   npm start
   ```

   The backend server should now be running on `http://localhost:4000`.

### 3. Set Up the Frontend

Open a new terminal window, navigate to the frontend directory, and install dependencies:

```bash
cd frontend
npm install --force // force because some shadcn components require it because React19 is fairly new for shadcn
```

#### Configure Environment Variables

1. Create a `.env` file in the `frontend` directory with the following content:

   ```env
   NEXT_PUBLIC_BACKEND_URL="http://localhost:4000"
   ```

   This tells the frontend where to send API requests.

2. Start the frontend development server:

   ```bash
   npm run dev
   ```

   The frontend application should now be running on `http://localhost:3000`.

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/shubhamprasad0/webbooks/blob/main/LICENSE) file for details.

---

Feel free to contribute to the project by submitting issues or pull requests. Your feedback and contributions are highly appreciated! 
