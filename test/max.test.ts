import validator from '../src';

test('it validates maximum string length properly', async () => {
  const { validate } = validator();
  const data = {
    name: 'hello',
  };
  const rules = {
    name: 'max:3',
  };
  const validation = await validate(data, rules);
  expect(validation.passes()).toEqual(false);
  expect(validation.errors()).toEqual({
    name: ['The name must be a maximum of 3 characters'],
  });
});
