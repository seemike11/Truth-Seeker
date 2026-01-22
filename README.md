# Replit to VSCode App

## Overview
This project is a web application that was originally built on Replit and has been migrated to a local development environment using Visual Studio Code. The application is structured using TypeScript and follows a modular architecture.

## Features
- User registration and authentication
- Route handling with controllers
- Business logic encapsulated in services
- Data models defining the structure of application data
- Utility functions for common tasks
- Type definitions for TypeScript

## Project Structure
```
replit-to-vscode-app
├── src
│   ├── index.ts          # Entry point of the application
│   ├── controllers       # Contains controller classes for handling routes
│   ├── routes            # Defines application routes
│   ├── services          # Contains business logic services
│   ├── models            # Defines data models
│   ├── utils             # Utility functions
│   └── types             # TypeScript interfaces and types
├── tests                 # Unit tests for the application
├── .vscode               # Development environment settings
├── package.json          # NPM configuration file
├── tsconfig.json         # TypeScript configuration file
└── README.md             # Project documentation
```

## Setup Instructions
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd replit-to-vscode-app
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Run the application:
   ```
   npm run dev
   ```

## Usage
After starting the application, you can access it at `http://localhost:3000`.

- Web page: `GET /` (served from `public/index.html`)
- API: `GET /api/users/:id`, `POST /api/users`

## Deploy (Render)
- Commit/push this repo to GitHub.
- Create a new Render Web Service from the repo (it will pick up `render.yaml`).
- Once deployed, add a custom domain on Render (recommended: `honestgovt.com` or `www.honestgovt.com`).

### Render Quickstart (recommended)
1. **Push to GitHub** (Render deploys from GitHub).
2. **Create a new Web Service** in Render and select this repo.
3. Render will read `render.yaml` automatically. If asked for commands:
   - **Build command:** `npm ci && npm run build`
   - **Start command:** `npm start`
4. After the deploy is live, use the Render dashboard to **add your custom domain** (root or `www`).
5. In Squarespace DNS, add the **CNAME/A records** that Render provides for `honestgovt.com`/`www`.
6. Wait for DNS to propagate (usually minutes, sometimes up to 24 hours).

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.
