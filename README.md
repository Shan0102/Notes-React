# React App Notes

A simple note-taking web application built with React, TypeScript, and Vite. Users can create, edit, and manage notes with authentication (including Google OAuth), multi-language support, and a responsive UI.
Can work with [Notes Server](https://github.com/Shan0102/Notes-Server.git) from my repos.

## Features

-   User authentication (username/email & password, Google OAuth)
-   Create, edit, and delete notes
-   Auto-save drafts for unsaved note changes
-   Responsive design for desktop and mobile
-   Multi-language support (English, Russian)
-   Light and dark theme switching
-   User profile management (update name, username, password)
-   Error and loading state handling

## Tech Stack

-   **Frontend:** React 19, TypeScript, Vite
-   **Routing:** React Router DOM v7
-   **State Management:** React Context API, React Hooks
-   **Styling:** CSS Modules
-   **Internationalization:** i18next, react-i18next
-   **API:** RESTful endpoints (see `.env` for server config)

## Configuration

-   **Environment Variables:**
    -   See `.env.example` for API endpoints and Google OAuth configuration.
    -   Create `.env` file and copy `.env.example` into it.
    -   See [https://console.cloud.google.com/apis/credentials] and create your own.
        Then change user id in `.env`
-   **API Server:**
    -   The app expects a backend server running at the endpoint specified in `.env`.
    -   Or download [Notes Server](https://github.com/Shan0102/Notes-Server.git) from my repos.
-   **Themes & Languages:**  
    Changeable via the settings menu in the app UI.

## Installation

1. **Clone the repository:**

    ```sh
    git clone https://github.com/Shan0102/Notes-React.git
    cd React_app_notes
    ```

2. **Install dependencies:**

    ```sh
    npm install
    ```

3. **Set up environment variables:**

    - Edit the `.env` file if needed (default values provided).

4. **Start the development server:**
    ```sh
    npm run dev
    ```

## Usage

-   Open [http://localhost:5173](http://localhost:5173) in your browser.
-   Sign up or log in to start creating and managing notes.
-   Use the navigation bar to access notes, settings, and user profile.
-   Switch language and theme from the settings menu.

## License

This project is licensed under the MIT License.

## Contact

For questions or feedback, please contact [shandev01@proton.me].
