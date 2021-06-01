import { HelperValidatiorResult } from '../../utils/validator';
import { HttpResponse } from '../protocols';

export const badRequest = (data: HelperValidatiorResult['errors']): HttpResponse => ({
  status: 400,
  data,
});

export const serverError = (): HttpResponse => ({
  status: 500,
});
