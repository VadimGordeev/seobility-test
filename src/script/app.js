import { Form } from './view/Form/Form';

export class App {
  constructor() {
    this.formValidator = new Form(document.getElementById('form'));
  }
}
