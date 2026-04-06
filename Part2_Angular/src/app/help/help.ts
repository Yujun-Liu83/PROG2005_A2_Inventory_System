// Import Angular core component
import { Component } from '@angular/core';
// Import common Angular directives
import { CommonModule } from '@angular/common';

// Component decorator with metadata
@Component({
  selector: 'app-help',        // HTML tag name for the component
  standalone: true,            // Mark as standalone component
  imports: [CommonModule],     // Required Angular modules
  templateUrl: './help.html',  // Path to template file
  styleUrls: ['./help.css']    // Path to style file
})

// Help page component (static content, no logic)
export class HelpComponent {
  // Empty class: static help page with no business logic
}