// Import Angular core dependencies and lifecycle hook
import { Component, OnInit } from '@angular/core';
// Import common Angular directives (ngIf, ngFor, etc.)
import { CommonModule } from '@angular/common';
// Import inventory service for data management
import { Inventory } from '../inventory';
// Import item data model/interface
import { Item } from '../item.model';

// Component decorator with metadata
@Component({
  selector: 'app-popular-items',    // Component HTML tag name
  standalone: true,                 // Mark as standalone component
  imports: [CommonModule],          // Required module for template directives
  templateUrl: './popular-items.html',  // Path to HTML template
  styleUrls: ['./popular-items.css']     // Path to CSS styles
})

// Component to display popular inventory items
export class PopularItemsComponent implements OnInit {
  // Array to store list of popular items
  popularItems: Item[] = [];

  // Inject inventory service via constructor
  constructor(private inventoryService: Inventory) {}

  // Lifecycle hook: runs when component initializes
  ngOnInit(): void {
    // Get popular items from service and assign to local array
    this.popularItems = this.inventoryService.getPopularItems();
  }
}