import {
  MessageBag,
  ParsedRule,
  Rules,
  Validatable,
  ValidationResult,
  Validator,
  ValidatorResult,
} from './interfaces';
import { toTitleCase } from './utils';
const validator = (): Validator => {
  const messages: MessageBag = {};

  const parseRule = (rule: string): ParsedRule => {
    const [name, ...params] = rule.split(':');
    return {
      rule: toTitleCase(name),
      params: params,
    };
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
    validate: (data: Validatable, rules: Rules): Promise<ValidatorResult> => {
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

        resolve({
          passes: () => Object.keys(messages).length === 0,
          fails: () => Object.keys(messages).length > 0,
          errors: () => messages,
        });
      });
    },
  };
};

// const { validate } = validator();

// const doTheThing = async () => {
//   const data = {
//     name: 't',
//   };
//   const rules = {
//     name: 'min:3',
//   };

//   const theThing = await validate(data, rules);
//   return theThing;
// };

// doTheThing().then(theThing => {
//   console.log(theThing);
// });

export default validator;
