# Introduction

Nvoice Validations provides various rules for you to validate data.

# Validation Quickstart

```
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
