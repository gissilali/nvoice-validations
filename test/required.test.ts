import useValidator from '../src';

const { validate } = useValidator();

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
