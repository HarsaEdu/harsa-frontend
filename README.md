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

## Reflection

  - What was the context for this project? (ie: was this a side project? was this for Turing? was this for an experiment?)
  - What did you set out to build?
  - Why was this project challenging and therefore a really good learning experience?
  - What were some unexpected obstacles?
  - What tools did you use to implement this project?
      - This might seem obvious because you are IN this codebase, but to all other humans now is the time to talk about why you chose webpack instead of create react app, or D3, or vanilla JS instead of a framework etc. Brag about your choices and justify them here.  

#### Example:  

This was a 3 week long project built during my third module at Turing School of Software and Design. Project goals included using technologies learned up until this point and familiarizing myself with documentation for new features.  

Originally I wanted to build an application that allowed users to pull data from the Twitter API based on what they were interested in, such as 'most tagged users'. I started this process by using the `create-react-app` boilerplate, then adding `react-router-4.0` and `redux`.  

One of the main challenges I ran into was Authentication. This lead me to spend a few days on a research spike into OAuth, Auth0, and two-factor authentication using Firebase or other third parties. Due to project time constraints, I had to table authentication and focus more on data visualization from parts of the API that weren't restricted to authenticated users.

At the end of the day, the technologies implemented in this project are React, React-Router 4.0, Redux, LoDash, D3, and a significant amount of VanillaJS, JSX, and CSS. I chose to use the `create-react-app` boilerplate to minimize initial setup and invest more time in diving into weird technological rabbit holes. In the next iteration I plan on handrolling a `webpack.config.js` file to more fully understand the build process.

## Project Structure

harsa-frontend
├── .github
│   └── workflow
│       └── main.yml
├── public
│   ├── assets
│   └── Screenshots
├── src
│   ├── assets
│   ├── components
│   ├── pages
│   ├── routes
│   ├── style
│   ├── utils
│   └── main.jsx
├── .dockerignore
├── Dockerfile
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── tailwind.config.js
└── vite.config.js


## Technology

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
- [Tailwind CSS] (https://tailwindcss.com/) CSS Framework