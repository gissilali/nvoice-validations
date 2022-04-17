export interface ParsedRule {
  rule: string;
  params: string[];
}

export interface Rules {
  [key: string]: string;
}

export interface Validatable {
  [key: string]: string | number | boolean;
}

export interface ValidationResult {
  passes: boolean;
  message: string;
}

export interface Validator {
  validate(data: Validatable, rules: Rules): Promise<MessageBag>;
}

export interface MessageBag {
  [key: string]: string[];
}
