import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss'
})
export class DrawerComponent {
@Input() data: any; // Ex: { "Nom": "Test", "Email": "test@gmail.com", ... }

@Input() open: boolean = false;

@Input() title = "Détails"

@Output() closed = new EventEmitter<void>();

keepOrder = () => 0; // désactive le tri alphabétique

  close() {
    this.closed.emit();
  }

}
