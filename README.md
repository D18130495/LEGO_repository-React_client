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

### This project used our repositories from GitHub
1. - The purpose of using is to reset css style, in order to make some elements look better.
   - reset.css [jgthms/minireset.css](https://github.com/jgthms/minireset.css)(many thanks)

2. - The purpose of using is to add text editor, wysiwyg(What you see is what you get).
   - wysiwyg [jpuri/react-draft-wysiwyg](https://github.com/jpuri/react-draft-wysiwyg)(many thanks)

## Project structure

```
LEGO Repositories
├── api -- Axios to send Ajax requests(GET, POST)
│       ├── ajax.js -- Use Axios to send Ajax request
│       └── index.js -- Encapsulate all request, and defined request URL
│
├── assets -- General resources
│
├── components -- Some components of page ├── Add category form
│                                         ├── Add or update user form
│                                         ├── Add permission tree
│                                         ├── Main page header
│                                         ├── Main page left menu bar
│                                         ├── Update category form
│                                         ├── Upload image components
│                                         └── wysiwyg text editor
│
├── pages ├── home -- main page to show search function
│         ├──   ├──home -- route page of the home
│         ├──   ├──setInfoHome -- get the set information from the db and display through the list
│         ├──   └──detail -- the detail page to display more specific information of set
│         ├──        
│         ├── login -- login page to let user login the system       
│         ├──   ├── images -- background image of the login page
│         ├──   └── login -- the login page
│         ├──
│         ├── main -- main page to show the layout of this website
│         ├──   └── main -- the layout of the main page
│         ├──
│         ├── setInfo -- page to display set information
│         ├──   ├── addOrUpdate -- use to add or update the set information
│         ├──   ├── detail -- the page to show the details of the Lego set 
│         ├──   ├── setInfo -- the page as router for setInfo function
│         ├──   └── setInfoHome -- the page use to display the list of all sets
│         ├──
│         ├── theme -- manage the Lego theme
│         ├──   └── theme -- the page to manage the Lego theme
│         ├──
│         └── user -- manage the system user
│               └── user -- the page to manage the login user
│
├── utils -- some utils ├── currentTime.js -- Format and get current time
│                       ├── memoryUser.js -- Store the current login user's name
│                       └── storeUserName.js -- Save, load and delete the current login user
│
├── App.js -- Main router
│
└── index.js -- The main entrance of the website

```

## Get started with this project.

## API for the each request.