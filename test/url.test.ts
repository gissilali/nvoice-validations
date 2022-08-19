import validator from '../src';

it('fails on invalid url with a right error message', async () => {
  const { validate } = validator();
  const data = {
    url: 'hello',
  };

  const rules = {
    url: 'url',
  };

  const validation = await validate(data, rules);

  expect(validation.passes()).toEqual(false);
  expect(validation.errors()).toEqual({
    url: ['The url must be a valid url'],
  });
});

it('passes on valid url with no error message', async () => {
  const { validate } = validator();

  const data = {
    url: 'https://www.google.com',
  };

  const rules = {
    url: 'url',
  };

  const validation = await validate(data, rules);

  expect(validation.passes()).toEqual(true);
  expect(validation.errors()).toEqual({});
});
