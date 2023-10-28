import { Form } from './view/Form/Form';
import { Modal } from './view/Modal/Modal';

export class App {
  constructor() {
    this.form = new Form();
    this.modal = new Modal();
  }
}
