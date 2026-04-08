import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',           // Component selector used in index.html
  standalone: true,              // Standalone component (no NgModule needed)
  imports: [RouterOutlet, RouterLink],  // Required directives for routing
  templateUrl: './app.html',     // HTML template file
  styleUrls: ['./app.css']       // Component-specific styles
})
export class AppComponent {   
  // Component property bound to template
  title = 'Part2_Angular';
}