## Project Name

Harsa.edu

Harsa.edu is a web-based application designed to assist instructors and administrators in managing online courses available on the Harsa Learning Management System, which is mobile-based, along with content such as classes, categories, and FAQs.

## Project Screen Shots

### Landing Page

![Landing Page](public/Screenshots/Landing%20Page.png)

### Dashboard Admin

![Dashboard Admin](public/Screenshots/Dashboard%20Admin.png)

### Dashboard Insructor

![Dashboard Instructor](public/Screenshots/Dashboard%20Instructor.png)

## Installation and Setup Instructions

Clone down this repository. You will need `node` and `npm` installed globally on your machine.  

Installation:

`npm install`  

To Run Test Suite:  

`npm test`  

To Start Server:

`npm run dev`  

## Project Structure

📦harsa-frontend
 ┣ 📂public
 ┃ ┣ 📂assets
 ┃ ┣ 📂Screenshots
 ┣ 📂src
 ┃ ┣ 📂assets
 ┃ ┣ 📂components
 ┃ ┣ 📂routes
 ┃ ┣ 📂styles
 ┃ ┣ 📂utils
 ┃ ┗ 📜main.jsx
 ┣ 📜.dockerignore
 ┣ 📜.eslintrc.cjs
 ┣ 📜.gitignore
 ┣ 📜components.json
 ┣ 📜Dockerfile
 ┣ 📜index.html
 ┣ 📜jsconfig.json
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┣ 📜postcss.config.js
 ┣ 📜README.md
 ┣ 📜tailwind.config.js
 ┣ 📜vercel.json
 ┗ 📜vite.config.js

## Technology

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh