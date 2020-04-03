function clearError($control) {
  $control.classList.remove('invalid');
  const { nextSibling } = $control;
  if (nextSibling) {
    $control
      .closest('.form-control')
      .removeChild(nextSibling);
  }
}

function setError($control) {
  clearError($control);
  $control.classList.add('invalid');

  const element = document.createElement('p');
  element.classList.add('validation-error');
  element.innerText = 'Type correct text';

  $control.insertAdjacentElement('afterend', element);
}

export class Form {
  constructor(form, controls) {
    this.form = form;
    this.controls = controls;
  }

  value() {
    const value = {};

    Object.keys(this.controls).forEach(control => {
      value[control] = this.form[control].value;
    });

    return value;
  }

  clear() {
    Object.keys(this.controls).forEach(control => {
      this.form[control].value = '';
    });
  }

  isValid() {
    let isFormValid = true;

    Object.keys(this.controls).forEach(control => {
      const validators = this.controls[control];

      let isValid = true;
      validators.forEach(validator => {
        isValid = validator(this.form[control].value) && isValid;
      });

      !isValid ? setError(this.form[control]) : clearError(this.form[control]);

      isFormValid = isFormValid && isValid;
    });

    return isFormValid;
  }
}
