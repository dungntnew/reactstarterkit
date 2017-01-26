// schemas.js
import { Schema, arrayOf } from 'normalizr';
import _ from 'lodash'

const userSchema = new Schema('users', {
  idAttribute: user => user.login.toLowerCase()
})

const eventSchema = new Schema('events', {
  idAttribute: event => _.toString(event.id)
})

eventSchema.define({
  owner: userSchema
})

const categorySchema = new Schema('categories', {
  idAttribute: category => _.toString(category.id)
})

// Schemas for Github API responses.
const Schemas = {
  USER: userSchema,
  USER_ARRAY: arrayOf(userSchema),
  EVENT: eventSchema,
  EVENT_ARRAY: arrayOf(eventSchema),
  CATEGORY: categorySchema,
  CATEGORY_ARRAY: arrayOf(categorySchema),
}

export default Schemas;


