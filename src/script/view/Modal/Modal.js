export class Modal {
  constructor(openButtonId, closeButtonId, modalId) {
    this.openModalButton = document.getElementById(openButtonId);
    this.closeModalButton = document.getElementById(closeButtonId);
    this.modal = document.getElementById(modalId);
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
