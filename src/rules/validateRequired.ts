import { ValidationResult } from '../interfaces';

export function validateRequired(
  data: any,
  attribute: string,
  _params: string[] = []
): ValidationResult {
  const message = `${attribute} is required`;

  return {
    passes: data !== undefined && data !== null && data !== '',
    message,
  };
}
