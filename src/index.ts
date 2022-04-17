import {
  MessageBag,
  ParsedRule,
  Rules,
  Validatable,
  ValidationResult,
  Validator,
} from './interfaces';
const useValidator = (): Validator => {
  const messages: MessageBag = {};

  const parseRule = (rule: string): ParsedRule => {
    return {
      rule: toTitleCase(rule),
      params: [],
    };
  };

  const toTitleCase = (str: string): string => {
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  const validateAttribute = async (
    data: any,
    rule: string,
    attribute: string
  ): Promise<ValidationResult> => {
    const parsedRule = parseRule(rule);
    try {
      const validator = await getValidator(parsedRule.rule);
      const value = data[attribute];

      const params = parsedRule.params;
      return validator(value, attribute, params) as Promise<ValidationResult>;
    } catch (e) {
      throw new Error('Validator not found');
    }
  };

  const getValidator = async (rule: string) => {
    const validationImport = await import(`./rules/validate${rule}`);
    return validationImport[`validate${rule}`];
  };

  return {
    validate: (data: Validatable, rules: Rules): Promise<MessageBag> => {
      return new Promise(async (resolve, reject) => {
        const attributes = Object.keys(data);
        for (let i = 0; i < attributes.length; i++) {
          const attribute = attributes[i];
          const ruleSet = rules[attribute].split('|');
          for (let j = 0; j < ruleSet.length; j++) {
            const rule = ruleSet[j];
            try {
              const validation = await validateAttribute(data, rule, attribute);

              if (!validation.passes) {
                if (messages.hasOwnProperty(attribute)) {
                  messages[attribute].push(validation.message);
                } else {
                  messages[attribute] = [validation.message];
                }
              }
            } catch (e) {
              reject(new Error('Validator not found'));
              break;
            }
          }
        }

        resolve(messages);
      });
    },
  };
};

export default useValidator;