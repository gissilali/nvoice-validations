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

if(validator.fails()) {
  console.log(validator.errors()); // { name: ['The name field is required.' ]}
}

```

## Available Validation Rules

**email**

The field under validation must be a valid email address.

**required**

The field under validation must be present and not empty.

**min:number**

The field under validation must be a minimum of specified number

**max:number**

The field under validation must be a maximum of specified number
