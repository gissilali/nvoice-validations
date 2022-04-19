import validator from '../src';

test('validation fails for empty string', async () => {
  const { validate } = validator();

  const data = {
    name: '',
  };

  const rules = {
    name: 'required',
  };
  const validatorObject = await validate(data, rules);
  expect(validatorObject.fails()).toBe(true);
  expect(validatorObject.passes()).toBe(false);
});

test('validation passes for number', async () => {
  const { validate } = validator();

  const data = {
    name: 1,
  };

  const rules = {
    name: 'required',
  };
  const validatorObject = await validate(data, rules);
  expect(validatorObject.fails()).toBe(false);
  expect(validatorObject.passes()).toBe(true);
});

test('validation passes for string', async () => {
  const { validate } = validator();

  const data = {
    name: 'silali',
  };

  const rules = {
    name: 'required',
  };
  const validatorObject = await validate(data, rules);
  expect(validatorObject.fails()).toBe(false);
  expect(validatorObject.passes()).toBe(true);
});

test('validation passes for object', async () => {
  const { validate } = validator();

  const data = {
    name: {
      first: 'silali',
      last: 'khan',
    },
  };

  const rules = {
    name: 'required',
  };
  const validatorObject = await validate(data, rules);
  expect(validatorObject.fails()).toBe(false);
  expect(validatorObject.passes()).toBe(true);
});

test('validation passes for combo', async () => {
  const { validate } = validator();

  const data = {
    name: {
      first: 'silali',
      last: 'khan',
    },
    age: 1,
    company: 'Appslab',
  };

  const rules = {
    name: 'required',
    age: 'required',
    company: 'required',
  };
  const validatorObject = await validate(data, rules);
  expect(validatorObject.fails()).toBe(false);
  expect(validatorObject.passes()).toBe(true);
});
