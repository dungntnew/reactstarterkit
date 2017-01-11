export const defaultRules = {
  integer: {
    identifier  : 'integer',
    rules: [
      {
        type   : 'integer[1..100]',
        prompt : 'Please enter an integer value'
      }
    ]
  },
  decimal: {
    identifier  : 'decimal',
    rules: [
      {
        type   : 'decimal',
        prompt : 'Please enter a valid decimal'
      }
    ]
  },
  number: {
    identifier  : 'number_field',
    rules: [
      {
        type   : 'number',
        prompt : 'Please enter a valid number value'
      }
    ]
  },
  email: {
    identifier  : 'email',
    rules: [
      {
        type   : 'email',
        prompt : 'Please enter a valid e-mail'
      }
    ]
  },
  url: {
    identifier  : 'url',
    rules: [
      {
        type   : 'url',
        prompt : 'Please enter a url'
      }
    ]
  },
  regex: {
    identifier  : 'regex',
    rules: [
      {
        type   : 'regExp[/^[a-z0-9_-]{4,16}$/]',
        prompt : 'Please enter a 4-16 letter username'
      }
    ]
  }
}
