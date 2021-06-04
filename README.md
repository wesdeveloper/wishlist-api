# wishlist-api

A system to client to comunicate with an app and provide data about client and their favorite products.

### Prerequisites

You need to have node/npm and docker installed on your machine.

## Getting Started

Clone the project, install dependencies, set env variables and run with npm script.

To clone the project:
```
git clone https://github.com/wesdeveloper/wishlist-api.git
```

Enter the project directory:

```
cd wishlist-api
```

Install all dependencies:
```
npm install
```

Create a file .env based on .env.example, after that open .env file and set your corret values:
```
cp .env.example .env
```

Now you can start the server:
```
npm start
```

### TESTS

To run unit tests just run npm run test:unit
```
npm run test:unit
```
To run functional tests just run npm run test:functional
```
npm run test:functional
```

### BUILD

To make a build version of the server just run npm run build comand and folder 'dist' will be created whit de files builded:
```
npm run build
```

Tor run the builded version use npm run server:
```
npm run start
```

## Built With

* [Express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js

* [Mysql](https://www.mysql.com/) -  MySQL is an open-source relational database management system (RDBMS).

* [KnexJs](http://knexjs.org/) - Knex.js is a "batteries included" SQL query builder for Postgres, MSSQL, MySQL, MariaDB, SQLite3, Oracle, and Amazon Redshift designed to be flexible, portable, and fun to use.

* [Joi](https://github.com/hapijs/joi) - Object schema description language and validator for JavaScript objects.

* [Jest](https://jestjs.io/) - Jest is a delightful JavaScript Testing Framework with a focus on simplicity.

## Authors

* **Wesley Lopes** - *BackEnd Developer NodeJs* - [wesdeveloper](https://github.com/wesdeveloper)

