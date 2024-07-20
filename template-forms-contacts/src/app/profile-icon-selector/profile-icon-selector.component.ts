import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { profileIconnames } from './profile-icon-names';

@Component({
  selector: 'con-profile-icon-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-icon-selector.component.html',
  styleUrl: './profile-icon-selector.component.css'
})
export class ProfileIconSelectorComponent {
  profileIcons = profileIconnames;
}
