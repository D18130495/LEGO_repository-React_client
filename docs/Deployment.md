# Deployment instructions

## Recommended deployment process
[Back-end](#Back-end) -> [Database](#Database) -> [Front-end](#Front-end)

## Front-end
1. Open the command line and display it to the react-admin_client directory through the cd command.
2. Enter ‘npm install’ start to download related packages.<br>
![D1.jpg](images\D1.jpg)
3. After finish the install, enter ‘npm start’ to start the front-end of this project.<br>
![D2.jpg](images\D2.jpg)
4. When the front-end is successfully compiled, it will automatically open the browser to display the webpage, the port number is 3000.

## Back-end
1. Open the command line and display it to the react-admin_server directory through the cd command.
2. Enter ‘npm install’ start to download related packages.<br>
![D3.jpg](images\D3.jpg)
3. Before start the server, make sure the mongodb service has been started.
4. After finish the install, enter ‘npm start’ to start the back-end of this project.<br>
![D4.jpg](images\D4.jpg)
5. 1When the back-end is successfully compiled, it will automatically create a database in mongodb called lego_repo, this database will have three collections called categorys, sets, users, the port number is 41571.<br>
![D5.jpg](images\D5.jpg)

## Database
1. Use MongoDBCompass to add data by import json fail, open the MongoDBCompass and connect to the localhost:27017.
2. After start the back-end server, it will automatically create a database in mongodb called lego_repo, open this database it will have three collections.
3. The first collection called catagorys, select add data, import file.<br>
![D6.jpg](images\D6.jpg)
4. Select the file which I provided called catagorys.json and choose JSON type, import it and the category data will be imported.<br>
![D7.jpg](images\D7.jpg)<br>
The data will looks like this.<br>
![D8.jpg](images\D8.jpg)
5. Import sets.json and users.json according to the same steps as above 3 - 4.