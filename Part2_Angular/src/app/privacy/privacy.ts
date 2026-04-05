// Import Angular core component decorator
import { Component } from '@angular/core';
// Import CommonModule for Angular's common directives
import { CommonModule } from '@angular/common';

// Component decorator defining metadata for Privacy page
@Component({
  selector: 'app-privacy',        // Custom HTML tag for this component
  standalone: true,               // Mark as standalone (no NgModule required)
  imports: [CommonModule],        // Import required Angular modules
  templateUrl: './privacy.html',  // Path to the HTML template file
  styleUrls: ['./privacy.css']    // Path to the CSS style file
})

// Privacy Policy component (static page with no business logic)
export class PrivacyComponent {
  // Empty class: this is a static content component (no logic needed)
}