import { toTitleCase } from '../src/utils';
import ruleSet from './stubs/ruleSet.json';
test('all dynamic imports are imported', async () => {
  const rules: string[] = ruleSet;
  let imports = 0;
  const promises: Promise<any>[] = [];
  rules.forEach(rule => {
    promises.push(
      import('../src/rules/validate' + toTitleCase(rule)).then(() => {
        imports = imports + 1;
      })
    );
  });

  await Promise.all(promises);

  expect(imports).toBe(rules.length);
});
