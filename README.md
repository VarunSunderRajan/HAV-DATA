# HAV v.1

More info goes here


## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Styling](#styling)

## Introduction

- Intro goes here

```bash
# simple cd setup 

cd ~Desktop/<your_project_name>/client

```

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
