// eslint-disable-next-line no-unused-vars
declare namespace NodeJS {
  // eslint-disable-next-line no-unused-vars
  interface Global {
    // https://stackoverflow.com/a/51114250
    testRequest: import('supertest').SuperTest<import('supertest').Test>;
  }
}
