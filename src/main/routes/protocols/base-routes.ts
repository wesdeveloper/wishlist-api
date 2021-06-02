import { Router } from 'express';

export default abstract class BaseRoutes {
  // eslint-disable-next-line no-unused-vars
  abstract loadRoutes(router: Router): void;
}
