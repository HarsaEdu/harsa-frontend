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
This project uses:
- ReactJs
  - Version: 18.2.15
  - Description: A JavaScript library for building user interfaces.
- Vite
  - Version: 4.0.3
  - Description: A fast frontend development build tool.
- Tailwind CSS
  - Version: 3.3.5
  - Description: A utility-first CSS framework for rapidly building custom user interfaces.
- Shadcn UI
  - Version: 1.2.0
  - Description: A UI component library for React applications.
- Lodash
  - Version: 4.17.21
  - Description: A JavaScript utility library.
- Swal Alert
  - Version: 11.10.1
  - Description: A beautiful, responsive, and customizable alert library.
- TanStack
  - Description: A collection of libraries for building scalable and maintainable applications.
- Docker
  - Description: A platform for developing, shipping, and running applications in containers.
- Axios
  - Version:1.6.2
  - Description: A promise-based HTTP client for the browser and Node.js.
- React chartJs2
  - Version: 5.2.0
  - Description: A React wrapper for Chart.js, a simple yet flexible JavaScript charting library.
- Prettier
  - Version: 3.0.3
  - Description: An opinionated code formatter.
- Date-fns
  - Version: 2.30.0
  - Description: A modern JavaScript date utility library.
- Zod
  - Version: 3.22.4
  - Description: A TypeScript-first schema declaration and validation library.


- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
