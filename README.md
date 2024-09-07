# 🏋🏼 GymPass Style App API
I developed this project during my latest studies on Node lessons at [Rocketseat](https://www.rocketseat.com.br).

## 🚀 Techs and Tools
- [Node.js v18](https://nodejs.org/)
- [Fastify](https://fastify.dev)
- [Prisma](https://www.prisma.io) / [PostgreSQL](https://www.postgresql.org/)  / [Docker](https://www.docker.com/)
- [Insomnia](https://insomnia.rest/)
- [Vitest](https://vitest.dev/)

## 🖥️ Project
This project was developed to practice the development of a API REST in Node.js with Fastify applying concepts as SOLID, design patterns (factory pattern, repositories pattern), clean architecture and TDD.

To get started with the flow of the application, you can register a new user and authenticate, then, you can get the logged-in user profile; create a gym (only user with admin role can create one); search for gyms by name or by geo-location (check for functional requirements below for the rules); the user can check-in into a gym (check for business rules below to know about the rules); The user can get the history of check-ins and their metrics; The admin user can validate this check-in within 20 minutes.

In this project we ensure that all application works by running all test over testing simply with routes on Insomnia. TDD (Test-Driven Development) concept was used in some tests situation, just for learning this method. It was applied unit tests to services layer and E2E test on controllers. It was used Vitest along with supertest to make requests. It was implemented GitHub Actions to run unit tests on push and E2E tests on pull requests. Prisma was used as ORM and client alongside with PostgreSQL database to mage with data.

To make the authentication it was used JWT (JSON Web Token) to persist user information with security into the application. It was applied RBAC (Role-Based Access Control) concept to assign roles to determinate kind of user.

## ⚙️ Get started
```zsh
npm i
npm run start:dev

docker compose up -d

npx prisma migrate dev
```

## 🔗 Routes
[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=Ignite%20Node.js%3A%20GymPass%20API%0A&uri=https://raw.githubusercontent.com/rcrdk/gympass-api-nodejs-solid/main/insomnia.json)

## 📋 Business Rules and Requirements

### Functional Requirements

- [x] It should be able to create an account;
- [x] It should be able to authenticate;
- [x] It should be able to get the authenticated user profile;
- [x] It should be able to get the total check-ins by the authenticated user;
- [x] It should be able to get all authenticated user check-ins history;
- [x] It should be able to find nearby gyms (around 10 kilometers);
- [x] It should be able to search for gyms by name;
- [x] It should be able to a user to check-in into a gym;
- [x] It should be able to validate a user check-in;
- [x] It should be able to create a new gym;

### Business Rules

- [x] The user cannot create a new account with a duplicated e-mail;
- [x] The user cannot make more than one check-in on the same day;
- [x] The user cannot check-in if their not nearby the gym (around 100 meters);
- [x] The check-in can only be validated till 20 minutes after created;
- [x] The check-in can only be validated by administrators;
- [x] The gym can only be created by administrators;

### Non Functional Requirements

- [x] The user password must be encypted;
- [x] All application data must be persisted on a postgreSQL database;
- [x] All data listed should be paginated with 20 itens by page;
- [x] The user must be identified by a JWT (JSON Web Token);