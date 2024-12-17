# React Posts Application

This is a simple React application built using **Vite** and **Ant Design**. It fetches and displays data from the JSONPlaceholder API and allows users to add new posts. The application includes robust error handling and follows best practices with **TypeScript**.

---

## Table of Contents

1. [Project Setup](#project-setup)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [How to Run the Project](#how-to-run-the-project)
5. [API Reference](#api-reference)
6. [Assumptions and Notes](#assumptions-and-notes)
7. [Time Spent](#time-spent)
8. [Instructions for Contributors](#instructions-for-contributors)

---

## Project Setup

To get started, clone this repository and install the required dependencies.

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/OmarIsmail0/Dinamo-MEA.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd react-app
   ```

3. **Install dependencies:**
   ```bash
   npm install
   # OR
   yarn install
   ```

---

## Features

### Core Features (Completed)

1. **Fetch and Display Posts**

   - Data is fetched from the JSONPlaceholder `/posts` endpoint.
   - Posts are displayed in a table using Ant Design's `Table` component.

2. **Add New Post**

   - Users can add a new post via a form with `title` and `body` fields.
   - On submission, a POST request is sent to the API, and the new post is displayed.

3. **Edit Existing Post**

   - Each post includes an edit button that opens a form pre-filled with the post's data.
   - On submission, a PUT request updates the post on the API.

4. **Delete Post**

   - Each post includes a delete button to remove it.
   - A DELETE request is sent to the API to simulate removing the post.

5. **Error Handling**

   - API errors are gracefully handled.
   - Ant Design's `notification` component displays error messages when a request fails.

6. **TypeScript Integration**
   - The project uses TypeScript for better type safety and maintainability.
   - Interfaces are defined for API data and component props.

---

## Technologies Used

- **React**: Component-based UI library.
- **Vite**: Fast development server and bundler.
- **TypeScript**: Type-safe JavaScript.
- **Ant Design**: UI framework for React with modern components.
- **Axios**: For making API requests.

---

## How to Run the Project

1. **Start the development server:**

   ```bash
   npm run dev
   # OR
   yarn dev
   ```

2. **Open your browser and visit:**

   ```
   http://localhost:5173
   ```

3. **You should see the application displaying a table of posts and a form to add new posts.**

---

## API Reference

This project uses the **JSONPlaceholder API**.

### Endpoints Used:

1. **Fetch Posts**:

   - **URL**: `https://jsonplaceholder.typicode.com/posts`
   - **Method**: GET

2. **Add Post**:

   - **URL**: `https://jsonplaceholder.typicode.com/posts`
   - **Method**: POST
   - **Request Body**:
     ```json
     {
       "title": "Your Title",
       "body": "Your Body"
     }
     ```
   - **Response**: Returns the new post with a simulated ID.

3. **Update Post**:

   - **URL**: `https://jsonplaceholder.typicode.com/posts/{id}`
   - **Method**: PUT
   - **Request Body**:
     ```json
     {
       "id": 1,
       "title": "Updated Title",
       "body": "Updated Body"
     }
     ```
   - **Response**: Returns the updated post with the same ID.

4. **Delete Post**:
   - **URL**: `https://jsonplaceholder.typicode.com/posts/{id}`
   - **Method**: DELETE
   - **Response**: Returns an empty object `{}`.

---

## Assumptions and Notes

1. **API Behavior**:

   - The JSONPlaceholder API does not persist new posts. The POST, PUT, and DELETE requests simulate behavior and return responses as if the changes were made.

2. **Error Handling**:

   - Error handling includes API request failures but does not cover network interruptions in detail.

3. **Styling**:
   - Styling is minimal and handled using Ant Design components for a clean and consistent UI.

---

## Time Spent

- **Core Tasks**: 2-4 hours
- **Testing and Debugging**: ~1 hour
- **Documentation**: ~30 minutes

---
