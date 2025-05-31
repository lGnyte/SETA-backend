## Installation steps

Copy the `.env.example` under project root into a new `.env` file, and fill out the variables.

Then, to install dependencies and run the server:
```
npm install
npx prisma migrate dev
npm run dev
```
seed the database
```
npm run seed
```

## Run the Prisma studio
```
npx prisma studio
```
https://www.prisma.io/docs/getting-started/quickstart-sqlite
