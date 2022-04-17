import validator from '../src';

const { validate } = validator();

const data = {
  name: '',
};

const rules = {
  name: 'required',
};

test('required validation works', async () => {
  const validator = await validate(data, rules);
  expect(Object.keys(validator).length).toEqual(1);
});
