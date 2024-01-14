# HAV v.1

Aggregates data given an API endpoint. Displays tabulated sales information from different companies, their locations and all brands/products under these companies. Filterable by desired state, time filtering will be implemented in v.2 

Core features include trending dashboard with tables, product graphs, brand graphs which include comparison

## Table of Contents

- [Introduction](#introduction)
- [API](#api)
- [Installation](#installation)
- [Styling](#styling)

## Introduction

- Intro goes here

```bash
# simple cd setup 

cd ~Desktop/<your_project_name>/client

```

## API 

- v.1 uses AWS PostgreSQL, AWS S3
- v.2 will incorperate Mediastack News API (in testing)

API is JSON format, initially parsed with Python ETL. DBeaver used for testing SQL database.
Can incorperate Python into Node.js backend in v.2


## Installation

Clone the repo and then do the following:

```bash
# go into client and install dependencies
cd client
npm install
# to run
npm run dev
```

```bash
# do the same for server
cd server
npm install
# to run
npm start
```

## Styling

Most images can be found as .png files inside the src > assets path. Some icons are used as SVG from 
- https://fontawesome.com/icons 
- https://icons8.com/icons/set/show-password

Example Usage: 

```bash
# fill lets you fill the color
const ChevronDown = ({ fill }) => {
    return <svg xmlns="http://www.w3.org/2000/svg" fill={fill ? fill : "#fff"} width="10" height="10" viewBox="0 0 24 24"><path d="M12 21l-12-18h24z" /></svg>
}

export default ChevronDown
```

The svg path is structured like this:


```javascript
project-root/client
│
├── src/
│   ├── assets/
│   │   ├── svg/
│   │   │   ├── ChevronDown.jsx
│   │   │   ├── ChevronUp.jsx
│   │   │   └── 
│   │   └── ...
│   └── ...
└── ...
```
