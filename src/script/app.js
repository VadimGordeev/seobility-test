import { Form } from './view/Form/Form';
import { Modal } from './view/Modal/Modal';

export class App {
  constructor() {
    this.form = new Form(document.getElementById('form'));
    this.modal = new Modal('open-modal', 'close-modal', 'modal');
  }
}
