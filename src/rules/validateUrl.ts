import { ValidationResult } from '../interfaces';

const matchesExactly = (value: string, pattern: RegExp): boolean => {
  const matchResults = value.match(pattern);
  const matchArray = matchResults ? [...matchResults] : [];
  return matchArray.length > 0 ? matchArray[0] === value : false;
};

export function validateUrl(
  value: string,
  attribute: string,
  _message: string = `The ${attribute} must be a valid url`
): ValidationResult {
  const regularExpression = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  console.log(value, matchesExactly(value, regularExpression));

  return {
    passes: matchesExactly(value, regularExpression),
    message: _message,
  };
}
