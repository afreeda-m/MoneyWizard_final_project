# Final Project MoneyWizard


## Backend Setup
`cd /backend`

Install dependencies with `npm install`.

## Creating The DB

Use the `psql -U labber` command to login to the PostgreSQL server with the username `labber` and the password `labber`.

Create a database with the command `CREATE DATABASE final_project_moneyWizard;`.

Create your own `.env` file and fill in the necessary PostgreSQL configuration. Here're the defualt ones:

```
PGHOST=localhost
PGUSER=labber
PGDATABASE=final_project_moneyWizard
PGPASSWORD=labber
PGPORT=5432
```

## Seeding

For now, let's:
- Create the tables using the psql commands `\i backend/src/db/schema/create.sql`.
- Seed our tables using the psql commands `\i backend/src/db/seeds/01_seeds.sql`.

## Run The Server

Running the server normally
```sh
npm start
```
