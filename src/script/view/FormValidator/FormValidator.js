export class FormValidator {
  constructor(form) {
    this.form = form;
    this.fields = form.querySelectorAll('input, textarea');
    this.errors = {};

    this.form.addEventListener('submit', (event) => this.validateForm(event));
  }

  validateForm(event) {
    event.preventDefault();
    this.clearErrors();

    this.fields.forEach((field) => {
      const fieldName = field.getAttribute('name');
      const value = field.value;

      if (!value) {
        this.setError(fieldName, 'Поле обязательно к заполнению.');
      }

      if (fieldName === 'email' && value && !this.isValidEmail(value)) {
        this.setError(fieldName, 'Некорректный адрес электронной почты.');
      }
    });

    if (Object.keys(this.errors).length === 0) {
      this.form.submit();
    }
  }

  setError(fieldName, errorMessage) {
    const root = document.documentElement;
    const errorColor = getComputedStyle(root)
      .getPropertyValue('--error-color')
      .trim();
    const field = this.form.querySelector(`[name=${fieldName}]`);
    const errorField = this.form.querySelector(`#${fieldName}Error`);

    field.style.borderColor = errorColor;
    errorField.textContent = errorMessage;
    this.errors[fieldName] = true;
  }

  clearErrors() {
    for (const field of this.fields) {
      const fieldName = field.getAttribute('name');
      const errorField = this.form.querySelector(`#${fieldName}Error`);

      field.style.borderColor = '';
      errorField.textContent = '';
    }

    this.errors = {};
  }

  isValidEmail(email) {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  }
}
