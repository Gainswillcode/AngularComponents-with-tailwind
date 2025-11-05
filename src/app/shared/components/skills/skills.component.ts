import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ObserveVisibilityDirective } from '../../app/directives/observe-visibility.directive';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, ObserveVisibilityDirective, TranslatePipe],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})

export class SkillsComponent {

  skills = [
    { name: 'SKILLS.name1', icon: 'images/skills/figma.png', percent: 80, visible: false },
    { name: 'SKILLS.name2', icon: 'images/skills/dev.png', percent: 75, visible: false },
    { name: 'SKILLS.name3', icon: 'images/skills/photoshop.png', percent: 70, visible: false },
    { name: 'SKILLS.name4', icon: 'images/skills/wordPress.png', percent: 95, visible: false },
  ];

  onVisible(name: string, event: IntersectionObserverEntry) {
    if (event.isIntersecting) {
      const skill = this.skills.find(s => s.name === name);
      if (skill) skill.visible = true;
    }
  }


}
