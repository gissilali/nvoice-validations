# Introduction

Nvoice Validations provides various rules for you to validate data. Inspired by Laravel validations.

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

## Available Validation Rules
**required**

The field under validation must be present and not empty.

**email**

The field under validation must be a valid email address.

