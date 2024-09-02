# 🏋🏼 GymPass Style App API
I developed this project during my latest studies on Node lessons at [Rocketseat](https://www.rocketseat.com.br).

## 🚀 Techs and Tools
- [Node.js v18](https://nodejs.org/)
- [Fastify](https://fastify.dev)
- [Prisma](https://www.prisma.io) / [PostgreSQL](https://www.postgresql.org/)  / [Docker](https://www.docker.com/)
- [Insomnia](https://insomnia.rest/)
- [Vitest](https://vitest.dev/)

## 🖥️ Project
<!-- - Write about the project -->
<!-- - Design Patterns -->
<!-- - SOLID -->
<!-- - Repository Pattern -->
<!-- - Testing: Unit tests, In-Memory Databases -->

## ⚙️ Get started
```shell
npm i
npm run start:dev

docker compose up -d

npx prisma migrate dev
```

## 🔗 Routes
<!-- - Export and commit insomnia JSON, then, test it -->
[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=Ignite%20Node.js%3A%20GymPass%20API%0A&uri=https://raw.githubusercontent.com/rcrdk/gympass-api-nodejs-solid/main/insomnia.json)

<!-- - List table of routes? -->

## 📋 Business Rules and Requirements

### Functional Requirements

- [ ] It should be able to create an account;
- [ ] It should be able to authenticate;
- [ ] It should be able to get the authenticated user profile;
- [ ] It should be able to get the total check-ins by the authenticated user;
- [ ] It should be able to get all authenticated user check-ins history;
- [ ] It should be able to find nearby gyms;
- [ ] It should be able to search for gyms by name;
- [ ] It should be able to a user to check-in into a gym;
- [ ] It should be able to validate a user check-in;
- [ ] It should be able to create a new gym;

### Business Rules

- [ ] The user cannot create a new account with a duplicated e-mail;
- [ ] The user cannot make more than one check-in on the same day;
- [ ] The user cannot check-in if their not nearby the gym (around 100 meters);
- [ ] The check-in can only be validated till 20 minutes after created;
- [ ] The check-in can only be validated by administrators;
- [ ] The gym can only be created by administrators;

### Non Functional Requirements

- [ ] The user password must be encypted;
- [ ] All application data must be persisted on a postgreSQL database;
- [ ] All data listed should be paginated with 20 itens by page;
- [ ] The user must be identified by a JWT (JSON Web Token);