import validator from '../src';

it('is a valid url', async () => {
  const { validate } = validator();
  const data = {
    url: 'hello',
  };

  const rules = {
    url: 'url',
  };

  const validation = await validate(data, rules);

  expect(validation.passes()).toEqual(false);
  console.log(validation.errors());
  //   expect(validation.errors()).toEqual({
  //     url: ['The url must be a valid url'],
  //   });
});
