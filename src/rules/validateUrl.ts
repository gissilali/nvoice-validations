import { ValidationResult } from '../interfaces';

const matchesExactly = (value: string, pattern: RegExp): boolean => {
  const matchResults = value.match(pattern);
  const matchArray = matchResults ? [...matchResults] : [];
  return matchArray.length > 0 ? matchArray[0] === value : false;
};

export function validateUrl(
  value: string,
  attribute: string,
  _params: string[] = [],
  _message: string = `The ${attribute} must be a valid url`
): ValidationResult {
  const regularExpression = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

  return {
    passes: matchesExactly(value, regularExpression),
    message: _message,
  };
}
