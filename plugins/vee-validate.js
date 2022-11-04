import Vue from 'vue'
import {
  extend,
  ValidationProvider,
  ValidationObserver,
  setInteractionMode,
} from 'vee-validate'

import { required, max, digits, email, min, is } from 'vee-validate/dist/rules'

setInteractionMode('eager')

extend('required', {
  ...required,
  message: '{_field_} can not be empty',
})
extend('email', {
  ...email,
  message: 'Email must be valid',
})
extend('max', {
  ...max,
  message: '{_field_} can not be greater than {length}',
})
extend('min', {
  ...min,
  message: '{_field_} can not be less than {length}',
})
extend('digits', {
  ...digits,
  message: '{_field_} must be of {length} digits',
})
extend('is', {
  ...is,
  message: '{_field_} is required',
})
const phoneOrEmailRule = {
  getMessage(field, args) {
    return `The ${field} must be either a valid phone number or e-mail`
  },
  validate(value, args) {
    // Custom regex for a phone number
    // (supplied in the SO post: https://stackoverflow.com/q/50033651/2600825)
    const MOBILEREG = /^((1[3578][0-9])+\d{8})$/

    // Check for either of these to return true
    return email(value) || MOBILEREG.test(value)
  },
}

// Extend VeeValidate with our new custom rule
extend('phoneOrEmail', phoneOrEmailRule)
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
