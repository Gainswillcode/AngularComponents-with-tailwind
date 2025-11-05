import { Component } from '@angular/core';
import { services } from '../../app/utils/datautils';
import { TranslateParser, TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {

  services = services;
}
