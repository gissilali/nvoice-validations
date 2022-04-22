import validator from '../src';

test('it validates minimum string length properly', async () => {
  const { validate } = validator();
  const data = {
    name: 't',
  };
  const rules = {
    name: 'min:3',
  };
  const validation = await validate(data, rules);
  expect(validation.passes()).toEqual(false);
  expect(validation.errors()).toEqual({
    name: ['The name must be a minimum of 3 characters'],
  });
});
