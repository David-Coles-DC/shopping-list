# Shopping List - David Coles - Mayden Tech Test

To complete this tech test I chose to use Next.js (15), the reason for this is that it is a React framework and I was aware that you used React in your current tech stack, and although I've not used this in a professional environment I wanted to show that I could use a new technology to achieve a desired result.

First, clone the repository and then run

```
npm i 
```

Next start a dev server to run the app

```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the project.

## Database
The project has a MySQL database set up using [Aiven](https://aiven.io/) as it's free and saves the hassle of having to set up a new local database to test the project, the connection details of this can be found in an .env file. However Git won't let me push a .env file into the repository for security reasons so you will need to recreate it.

```
DB_HOST=shopping-list-dc-shopping-list-dc.d.aivencloud.com
DB_PASS=AVNS_Mb5x2yk5ljbkV-P8hxo
DB_PORT=17803
DB_SCHEMA=defaultdb
DB_USER=avnadmin
```

The database structure has been exported so that you can use a different MySQL database if you want to, this is found in the database.sql file.

## Packages

I chose several packages to use in this project to help speed it along and show that I'm capable of integrating additional packages into a project, some of these are;

* **ShadCN** - This was chosen because it has some nice looking components like buttons, inputs, etc and would save time in making the project look more professional.
* **Tailwind** - Again, this was used to speed up the styling of the app
* **zod** - This was used to help with form validation
* **bcrypt** - This was used to hash the password before saving it to the database as well as comparing passwords when logging in.
* **mysql2** - This was used to connect to the MySQL database.
* **dnd-kit** - This was used to aid the drag and drop functionality of the list.

## Tutorial
When you run the app you first need to navigate to the sign up form by clicking the **sign up** button on the home page.

Fill out the form and your account will be created, you will then be redirected to the shopping list page.

To create items on the list click the **add new item** button, fill out the fields and click **add**, you will be taken back to your shopping list with the new item on there.

Based on the quantities and prices of your items, a total will be calculated and displayed at the bottom of the list.

You can also set a budget by clicking the edit button next to the budget amount at the bottom of the list. type in your budget and you will be warned if the total amount of items exceeds the budget amount.

You can reorder the list by dragging and dropping the items.

## Final thoughts

If I was to put this project into production there are more things that I would do to it if I had more time, including but not limited to;

* **Automated testing** - Jest or Cypress to complete automated testing.
* **limited timed sessions** - When somebody logs in the API would create an authorisation key with an expiry time, the expiry time would be increased each time data was retrieved from the API, if the expiry time is reached then that user would be required to re-login to increase security.

