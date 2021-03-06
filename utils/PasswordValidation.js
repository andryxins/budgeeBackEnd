const passwordValidator = require('password-validator');

const schema = new passwordValidator();

schema
  .is()
  .min(8) // Minimum length 8
  .is()
  .max(16) // Maximum length 100
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits() // Must have digits
  .has()
  .not()
  .spaces(); // Should not have spaces

module.exports = password => schema.validate(password);
