# LEGO Repositories, Help you find all Lego sets.

[LEGO official website](https://www.lego.com/en-ie).

## Project Introduction
- [Technology Selection](#technology-selection)
- [Project structure](#project-structure)
- [Get started with this project](#get-started-with-this-project)
- [API for the each request](#api-for-the-each-request)

## Technology Selection
|     Technology     |        Description       |                Official website                |
| :----------------: | :----------------------: | :--------------------------------------------: |
|       React        |    Front-end framework   |               https://reactjs.org/             |
|     Ant Design     |  React UI Component Repo |           https://ant.design/index-cn          |
|     Ajax(Axios)    | Send asynchronous request|                                                |
|                    |                          |                                                |



### This project used our repositories from GitHub
- The purpose of using is to reset css style, in order to make some elements look better.
- reset.css [jgthms/minireset.css](https://github.com/jgthms/minireset.css)(many thanks)

## Project structure

```
LEGO Repositories
├── api -- Axios to send Ajax requests(GET, POST)
│       ├── ajax.js -- Use Axios to send Ajax request
│       └── index.js -- Encapsulate all request, and defined request URL
│
├── assets -- General resources
│
├── components -- Some components of page
│
├── pages ├──
│         ├──home -- main page to show search function
│         └──     ├──home -- route page of the home
│                 ├──setInfoHome -- get the set information from the db and display through the list
│                 ├──detail -- the detail page to display more specific information of set
│                 └──
│
├── utils -- some utils
├── 
├── 
├── 
└── 
```

## Get started with this project.

## API for the each request.