import Inputmask from 'inputmask';

export class Form {
  constructor(form) {
    this.form = form;
    this.fields = form.querySelectorAll('input, textarea');
    this.errors = {};

    this.errorContainer = document.getElementById('errorResponseMessage');
    this.successMessage = document.getElementById('successResponseMessage');

    this.form.addEventListener('submit', (event) => this.validateForm(event));

    this.initPhoneMask();
  }

  validateForm(event) {
    event.preventDefault();
    this.clearErrors();
    this.successMessage.textContent = '';

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
      this.submitForm();
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
    this.fields.forEach((field) => {
      const fieldName = field.getAttribute('name');
      const errorField = this.form.querySelector(`#${fieldName}Error`);

      field.style.borderColor = '';
      errorField.textContent = '';
    });

    this.errors = {};

    while (this.errorContainer.firstChild) {
      this.errorContainer.removeChild(this.errorContainer.firstChild);
    }
  }

  isValidEmail(email) {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  }

  initPhoneMask() {
    const phoneInput = this.form.querySelector('[name="phone"]');
    if (phoneInput) {
      const phoneMask = new Inputmask({
        mask: '+375 (99) 999-99-99',
        placeholder: '_',
        clearIncomplete: true
      });
      phoneMask.mask(phoneInput);
    }
  }

  submitForm() {
    const formData = {};

    this.fields.forEach((field) => {
      const fieldName = field.getAttribute('name');
      const value = field.value;

      if (fieldName) {
        formData[fieldName] = value;
      }
    });

    fetch('http://localhost:3000/form', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'error') {
          Object.entries(data.fields).forEach(([fieldName, error]) => {
            const errorField = document.createElement('span');
            errorField.textContent = error;
            this.errorContainer.appendChild(errorField);
            this.errors[fieldName] = true;
          });
        } else if (data.status === 'success') {
          this.clearFields();
          this.successMessage.textContent = data.message;
        }
      })
      .catch((error) => {
        throw new Error('Ошибка при отправке формы:', error);
      });
  }

  clearFields() {
    this.fields.forEach((field) => {
      field.value = '';
    });
  }
}
