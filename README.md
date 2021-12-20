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
1. LEGO_Repo_documentation.docx is the documentation, readme.docx is the deployment process.
2. sets.json, users.json, categorys.json are the Json file for the MongoDB database.
3. The deployment process of the front-end, back-end and database are all in LEGO_Repo_documentation.docx.

## API for the each request.
1. http://localhost:41571/login: use for user login (POST)
2. http://localhost:41571/manage/category/list: use for get category list (GET)
3. http://localhost:41571/manage/category/add: use for add category list (POST)
4. http://localhost:41571/manage/category/update: use for update category list, can be theme or year (POST)
5. http://localhost:41571/manage/category/year: use for get year list (GET)
6. http://localhost:41571/manage/category/year/delete: use for delete year (GET)

7. http://localhost:41571/manage/set/add: use for add set information (POST)
8. http://localhost:41571/manage/set/update: use for update set information (POST)
9. http://localhost:41571/manage/set/delete: use for delete set information (POST)
10. http://localhost:41571/manage/set/list: use to get set list (GET)
11. http://localhost:41571/manage/set/search: use to get set list by pagination (GET)

12. http://localhost:41571/manage/user/list: use for get user list (GET)
13. http://localhost:41571/manage/user/add: use for add user (POST)
14. http://localhost:41571/manage/user/update: use for update user (POST)
15. http://localhost:41571/manage/user/delete: use for delete user (POST)

16. http://localhost:41571/manage/img/upload: use for upload images (POST)
17. http://localhost:41571/manage/img/delete: use for delete images (POST)