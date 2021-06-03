import supertest from 'supertest';
import { Application } from 'express';
import app from '../src/main';
import database from '../src/infra/db/mysql/db';

let server: Application;
beforeAll(async () => {
  server = await app.init();
  global.testRequest = supertest(server);
});

afterEach(async () => {
  await database.getConnection()('client').delete();
});

afterAll(async () => {
  await database.closeConnection();
});
