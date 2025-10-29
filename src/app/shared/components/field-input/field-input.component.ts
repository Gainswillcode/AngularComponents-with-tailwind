import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-field-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './field-input.component.html',
  styleUrl: './field-input.component.scss',
})
export class FieldInputComponent {
  @Input() label!: string;
  @Input() type: 'text' | 'select' = 'text';
  @Input() placeholder: string = '';
  @Input() options: { value: any; label: string }[] = [];
  @Input() value: any; // valeur actuelle

  @Output() valueChange = new EventEmitter<any>();

}
