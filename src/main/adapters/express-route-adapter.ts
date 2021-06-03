import { Request, Response } from 'express';
import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols';

export const expressRouterAdapter = (controller: Controller) => async (req: Request, res: Response) => {
  const httpRequest: HttpRequest = {
    body: req.body,
    query: {},
  };

  const httpResponse: HttpResponse = await controller.handle(httpRequest);
  return res.status(httpResponse.status).send(httpResponse.data);
};
