import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './privacy.html',
  styleUrls: ['./privacy.css']
})
export class PrivacyComponent {
  currentYear = new Date().getFullYear();

  
  faqs = [
    { q: 'Do you use cookies or trackers?', a: 'No. This application does not use cookies, local storage, or any tracking technologies. No analytics SDKs are integrated.', expanded: false },
    { q: 'Is my data shared with third parties?', a: 'Absolutely not. Since no data is collected or transmitted, there is no sharing with any third party.', expanded: false },
    { q: 'What happens if I close the browser?', a: 'All inventory data is stored only in memory. Closing the tab or browser will reset the data to the default sample set.', expanded: false },
    { q: 'Do I need to worry about XSS attacks?', a: 'Angular’s built-in sanitization protects against XSS. All user inputs are validated and escaped.', expanded: false }
  ];

  toggleFaq(index: number): void {
    this.faqs[index].expanded = !this.faqs[index].expanded;
  }
}