# create-task-yocket
Installation instructions:
  1. Run the command "npm install"in the root directory of the project and in the client folder of the application.
  2. Start the app using "npm run dev" command which runs both server and client start scripts
  3. No need to install or configure any local DB as the app's connected to remote DB with a user created who can only access the DB dedicated to this app

IMPORTANT:

Incase if app don't work due to proxy issue please follow the below steps
  1. Remove "proxy": "http://localhost:3001" from package.json in client folder
  2. run "npm run build" in client folder
  3. run "npm run server" from root directory of the app
