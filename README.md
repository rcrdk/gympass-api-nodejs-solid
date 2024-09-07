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
<!-- - Testing: E2E, Unit tests, In-Memory Databases, in this project we ensure that all application works by running all tests over testing with routing -->
<!-- - Errors threatments -->

<!-- - Clean Architecture -->

<!-- - SOLID: boas prática de código -->
<!-- - S: Single Responsibility Principle: uma classe deve ter uma e apenas uma razão para mudar. -->
<!-- - O: Open-Closed Principle: objetos devem estar disponíveis para extensão, mas fechados para modificação. -->
<!-- - L: Liskov Substitution Principle: uma subclasse deve ser substituível por sua superclasse. -->
<!-- - I: Interface Segregation Principle): uma classe não deve ser obrigada a implementar métodos e interfaces que não serão utilizadas. -->
<!-- - D: Dependency Inversion Principle: dependa de abstrações e não de implementações. -->

<!-- Design Patterns: -->
<!-- - Repository Pattern: S,I e D do SOLID -->
<!-- - Factory Pattern: É o padrão de design mais usado no mundo OOP porque economiza muito tempo no futuro quando você precisa modificar uma das classes que você usou. -->

<!-- Metodologias de desenvolvimento: -->
<!-- - TDD: Test-Driven Development -->

<!-- JWT -->
<!-- RBAC: Role-Based Access Control -->

## ⚙️ Get started
```zsh
npm i
npm run start:dev

docker compose up -d

npx prisma migrate dev
```

## 🔗 Routes
<!-- - Export and commit insomnia JSON, then, test it -->
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