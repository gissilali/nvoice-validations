# Introduction

Nvoice Validations provides various rules for you to validate data.

## Validation Quickstart

install

``npm i nvoice-validations``

use

```javascript
// index.js
import validator from '../src';

const { validate } = validator();

const data = {
  name: '',
};

const rules = {
  name: 'required',
};

const validator = await validate(data, rules);
```
