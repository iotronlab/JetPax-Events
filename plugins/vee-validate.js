import Vue from 'vue'
import {
  extend,
  ValidationProvider,
  ValidationObserver,
  setInteractionMode,
} from 'vee-validate'

import { required, max, digits, email, min } from 'vee-validate/dist/rules'

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
// Register it globally
// main.js or any entry file.
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
