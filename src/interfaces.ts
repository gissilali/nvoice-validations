export interface ParsedRule {
  rule: string;
  params: string[];
}

export interface Rules {
  [key: string]: string;
}

export interface Validatable {
  [key: string]: string | number | boolean | object;
}

export interface ValidationResult {
  passes: boolean;
  message: string;
}

export interface Validator {
  validate(data: Validatable, rules: Rules): Promise<ValidatorResult>;
}

export interface ValidatorResult {
  passes: () => boolean;
  fails: () => boolean;
  errors: () => MessageBag;
}

export interface MessageBag {
  [key: string]: string[];
}
