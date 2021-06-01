import Joi, { ValidationErrorItem, ObjectSchema } from 'joi';

export interface HelperValidatorErrorItem {
  path: string,
  message: string
}

export interface HelperValidatiorResult {
  isValid: boolean
  errors?: Array<HelperValidatorErrorItem>
}

const validateOptions = { abortEarly: false };

const formatErros = (errorsDetails: Joi.ValidationErrorItem[]) => errorsDetails.reduce((acc: any, curr: ValidationErrorItem) => acc.concat({ path: curr.path.join('.'), message: curr.message }), []);

export const validateObject = (data: Object, schema: ObjectSchema): HelperValidatiorResult => {
  const validationResult = schema.validate(data, validateOptions);

  let errors: Array<HelperValidatorErrorItem> = [];
  if (validationResult.error) {
    errors = formatErros(validationResult.error.details);
  }

  return {
    isValid: !errors.length,
    errors,
  };
};
