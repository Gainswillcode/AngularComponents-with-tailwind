import { Component, computed, Input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { SidebarService } from '../../core/services/sidebar.service';
import { CommonModule } from '@angular/common';
import { LoginserviceService } from '../../core/services/authservices/loginservice.service';
import { components } from './data';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe],
  templateUrl: './sidebar-menu.component.html',
  styleUrl: './sidebar-menu.component.scss'
})
export class SidebarMenuComponent {

  @Input() extraClass = '';
  @Input() rounded = false;

  constructor(private auth: LoginserviceService, public sidebarService: SidebarService) { }

   menu = computed(() => {
    const role = this.auth.getRole();
    return components.filter(item => item.roles!.includes(role));
  });
}
