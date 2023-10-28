export class Modal {
  constructor() {
    this.openModalButton = document.getElementById('open-modal');
    this.closeModalButton = document.getElementById('close-modal');
    this.modal = document.getElementById('modal');
    this.modalActions();
  }

  openModal() {
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  modalActions() {
    this.openModalButton.addEventListener('click', () => this.openModal());
    this.closeModalButton.addEventListener('click', () => this.closeModal());

    document.addEventListener('click', (event) => {
      if (event.target === this.modal) {
        this.closeModal();
      }
    });
  }
}
