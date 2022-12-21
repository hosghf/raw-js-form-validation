validateFunctions = {
  required: (value) => value.length !== 0,
  minlength: (value, min) => value.length < min,
  maxlength: (value, max) => value.length > max,
  email: (value) => {
    const emailRegExp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

    return emailRegExp.test(value)
  },
  zipcode: (value) => {
    const zipRegExp = /(^\d{5}$)|(^\d{5}-\d{4}$)/
    return zipRegExp.test(value)
  },
  equalto: (thisValue, shadowValue) => {
    return thisValue === shadowValue
  }
}

const formDom = {
  email: {
    element: document.querySelector('.email'),
    rule: ['required', 'email']
  },
  zipcode: {
    element: document.querySelector('.zipcode'),
    rule: ['required', 'zipcode']
  },
  country: {
    element: document.querySelector('.country'),
    rule: ['required', 'maxlength:10']
  },
  password:{
    element: document.querySelector('.password'),
    rule: ['required', 'minlength:5']
  },
  passwordConfirm: {
    element: document.querySelector('.password-confirm'),
    rule: ['required', 'minlength:5']
  }
}

function validate(value, ruleArray) {
  for(let rule of ruleArray) {
    if(rule.includes(':')) {
      // like 'maxlength:5' ruleTitle will be 'maxlenth'
      // and ruleparam will be '5'
      const [ruleTitle, ruleParam] = rule.split(':')

      if(validateFunctions[ruleTitle](value, ruleParam)) {
        return ruleTitle
      }

      continue
    }

    if(!validateFunctions[rule](value)) {
      return rule
    }
  }

  return false
}

function validateAll() {
  let valid = true

  for(let field in formDom) {
    clearError(field)

    if(validate(formDom[field].element.value, formDom[field].rule)) {
      showError(field)
      valid = false
    }
  }

  return valid
}

function clearError(field) {
  formDom[field].element.classList.remove('error')
  formDom[field].element.nextElementSibling.style.display = 'none'
}

function showError(field) {
  formDom[field].element.classList.add('error')
  formDom[field].element.nextElementSibling.style.display = 'block'
}

function submitForm() {
  if(!validateAll()) return

  console.log('your submit is done')
}

const submitButton = document.querySelector('.submit')
submitButton.addEventListener('click', submitForm)

formDom.email.element.addEventListener('input', function() {
  let error = validate(this.value, formDom.email.rule)
  if(error) {
    return showError('email')
  }

  clearError('email')
})

formDom.zipcode.element.addEventListener('input', function() {
  let error = validate(this.value, formDom.zipcode.rule)
  if(error) {
    return showError('zipcode')
  }

  clearError('zipcode')
})

formDom.country.element.addEventListener('input', function() {
  let error = validate(this.value, formDom.country.rule)
  if(error) {
    return showError('country')
  }

  clearError('country')
})

formDom.password.element.addEventListener('input', function() {
  let error = validate(this.value, formDom.password.rule)
  if(error) {
    return showError('password')
  }

  clearError('password')
})

formDom.passwordConfirm.element.addEventListener('input', function() {
  let error = validate(this.value, formDom.passwordConfirm.rule)
  if(error) {
    return showError('passwordConfirm')
  }

  clearError('passwordConfirm')
})
