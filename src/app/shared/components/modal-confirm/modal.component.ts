import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
@Input() closeOnBackdrop: boolean = true;

@Input() visible: boolean = false;

@Output() confirm = new EventEmitter<void>();
@Output() cancel = new EventEmitter<void>();

constructor() { }

onConfirm() {
  this.confirm.emit();
}

onCancel() {
  this.cancel.emit();
}

onBackdropClick() {
    if (this.closeOnBackdrop) {
      this.onCancel();
    }
  }
}
