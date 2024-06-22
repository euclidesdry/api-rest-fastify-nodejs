# API Rest wit Fastify & NodeJs

 Creating an api using Fastify with NodeJS (Structure, Database, Routes, Tests and Deploy)

## Application Requirements

### Functional Requirements

- [x] User should create a new transaction (credit, debt) **[POST/transactions]**;
- [x] User should list all occurred transactions **[GET/transactions]**;
- [x] User should visualize a unique transaction **[GET/transactions/:id]**;
- [x] User should get his account transaction details/summary **[GET/transactions/summary]**.

### Business Rule

- [x] Transactions should be of types: Credit total value or Subtraction of Debt;
- [x] Should be possible identify the User between requisitions (A way to identify the User: Currently by Cookie);
- [x] User must only visualize his created transactions.

### Non Functional Requirements
