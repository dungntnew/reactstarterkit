// schemas.js
import { Schema, arrayOf } from 'normalizr';
import _ from 'lodash'

const userSchema = new Schema('users', {
  idAttribute: user => _.toString(user.id)
})

const eventSchema = new Schema('events', {
  idAttribute: event => _.toString(event.id)
})

eventSchema.define({
  owner: userSchema,
  target: targetSchema,
  genre: genreSchema,
  participators: arrayOf(userSchema),
  // tags: arrayOf(tagSchema),
})

const genreSchema = new Schema('genres', {
  idAttribute: genre => _.toString(genre.id)
})

const targetSchema = new Schema('targets', {
  idAttribute: target => _.toString(target.id)
})

const tagSchema = new Schema('tags', {
  idAttribute: tag => _.toString(tag.id)
})

const imageSchema = new Schema('images', {
  idAttribute: image => _.toString(image.id)
})

const paymentSchema = new Schema('payments', {
  idAttribute: payment => _.toString(payment.id)
})

const paymentItemSchema = new Schema('paymentItems', {
  idAttribute: item => _.toString(item.id)
})

paymentSchema.define({
  paymentItems: arrayOf(paymentItemSchema),
})

const blogSchema = new Schema('blogs', {
  idAttribute: blog => _.toString(blog.id)
})

// Schemas for Github API responses.
const Schemas = {
  USER: userSchema,
  USER_ARRAY: arrayOf(userSchema),
  EVENT: eventSchema,
  EVENT_ARRAY: arrayOf(eventSchema),
  PAYMENT: paymentSchema,
  PAYMENT_ARRAY: arrayOf(paymentSchema),
  PAYMENT_ITEM: paymentItemSchema,
  PAYMENT_ITEM_ARRAY: arrayOf(paymentItemSchema),
  GENRE: genreSchema,
  GENRE_ARRAY: arrayOf(genreSchema),
  TARGET: targetSchema,
  TARGET_ARRAY: arrayOf(targetSchema),
  BLOG: blogSchema,
  BLOG_ARRAY: arrayOf(blogSchema),
}

export default Schemas;


