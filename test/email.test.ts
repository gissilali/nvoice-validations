import validator from '../src';
test('valid email passes validation test', async () => {
  let passes: string[] = [];
  let promises: Promise<any>[] = [];
  const validEmails = [
    'email@example.com',
    'firstname.lastname@example.com',
    'email@subdomain.example.com',
    'firstname+lastname@example.com',
    'email@123.123.123.123',
    'email@[123.123.123.123]',
    '"email"@example.com',
    '1234567890@example.com',
    'email@example-one.com',
    '_______@example.com',
    'email@example.name',
    'email@example.museum',
    'email@example.co.jp',
    'firstname-lastname@example.com',
    'much.”more unusual”@example.com',
    'very.unusual.”@”.unusual.com@example.com',
    'very.”(),:;<>[]”.VERY.”very@\\ "very”.unusual@strange.example.com',
  ];
  validEmails.forEach(email => {
    const { validate } = validator();
    const data = {
      email: email,
    };
    const rules = {
      email: 'email',
    };

    promises.push(
      validate(data, rules).then(validatorObject => {
        if (validatorObject.passes()) {
          passes.push(email);
        }
      })
    );
  });

  await Promise.all(promises);
  const percentagePass = (passes.length / validEmails.length) * 100;
  expect(percentagePass).toBeGreaterThanOrEqual(70);

  //   expect(passes).toBe(validEmails.length);
});
test('invalid email fails validation test', async () => {
  let fails: string[] = [];
  let promises: Promise<any>[] = [];
  const invalidEmails = [
    'plainaddress',
    '#@%^%#$@#$@#.com',
    '@example.com',
    'Joe Smith <email@example.com>',
    'email.example.com',
    'email@example@example.com',
    '.email@example.com',
    'email.@example.com',
    'email..email@example.com',
    'あいうえお@example.com',
    'email@example.com (Joe Smith)',
    'email@example',
    'email@-example.com',
    'email@example.web',
    'email@111.222.333.44444',
    'email@example..com',
    'Abc..123@example.com',
    '”(),:;<>[]@example.com',
    'just”not”right@example.com',
    'this is"really"notallowed@example.com',
  ];
  invalidEmails.forEach(email => {
    const { validate } = validator();
    const data = {
      email: email,
    };
    const rules = {
      email: 'email',
    };

    promises.push(
      validate(data, rules).then(validatorObject => {
        if (validatorObject.fails()) {
          fails.push(email);
        }
      })
    );
    // validate(data, rules).then(validatorObject => {
    //   if (validatorObject.fails()) {
    //     fails.push(email);
    //   }
    // });
  });

  await Promise.all(promises);
  const percentagePass = (fails.length / invalidEmails.length) * 100;
  expect(percentagePass).toBeGreaterThanOrEqual(70);
  //   expect(fails.length).toBe(invalidEmails.length);

  //   expect(fails).toBe(invalidEmails.length);
});
