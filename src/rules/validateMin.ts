import { ValidationResult } from '../interfaces';

export function validateMin(
  string: string,
  attribute: string,
  _params: string[] = [],
  _message: string = `The ${attribute} must be a minimum of ${_params[0]} characters`
): ValidationResult {
  return {
    passes: string.length >= parseInt(_params[0]),
    message: _message,
  };
}
