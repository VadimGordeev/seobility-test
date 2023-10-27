import { FormValidator } from './view/FormValidator/FormValidator';

export class App {
  constructor() {
    this.formValidator = new FormValidator(document.getElementById('form'));
  }
}
