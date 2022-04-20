import { ValidationResult } from '../interfaces';

const matchesExactly = (value: string, pattern: RegExp): boolean => {
  const matchResults = value.match(pattern);
  const matchArray = matchResults ? [...matchResults] : [];
  return matchArray.length > 0 ? matchArray[0] === value : false;
};

export function validateEmail(
  email: string,
  attribute: string,
  _params: string[] = []
): ValidationResult {
  const message = `${attribute}  is not a valid email`;
  const regularExpression = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

  return {
    passes: matchesExactly(email, regularExpression),
    message,
  };
}
