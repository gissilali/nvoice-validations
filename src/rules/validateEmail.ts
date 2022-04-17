import { ValidationResult } from '../interfaces';

export function validateEmail(
  data: any,
  attribute: string,
  params: string[]
): ValidationResult {
  const message = `${attribute} is not a valid email`;

  return {
    passes: true,
    message,
  };
}
