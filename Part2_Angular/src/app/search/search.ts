// Import Angular core dependencies
import { Component } from '@angular/core';
// Import common Angular directives (ngIf, ngFor, etc.)
import { CommonModule } from '@angular/common';
// Import form functionality for two-way binding
import { FormsModule } from '@angular/forms';
// Import inventory service for data operations
import { Inventory } from '../inventory';
// Import item data model/interface
import { Item } from '../item.model';

// Component decorator defining metadata
@Component({
  selector: 'app-search',          // Component HTML tag name
  standalone: true,                // Mark as standalone component
  imports: [CommonModule, FormsModule],  // Required modules
  templateUrl: './search.html',    // Template file path
  styleUrls: ['./search.css']       // Style file path
})

// Search component for filtering and finding inventory items
export class SearchComponent {
  searchTerm = '';                 // Search input text
  filterCategory = '';             // Selected category filter
  filterStock = '';                // Selected stock status filter
  searchResults: Item[] = [];      // Array to store search results
  
  // Predefined category options for dropdown
  categories = ['Electronics', 'Furniture', 'Clothing', 'Tools', 'Misc'];
  // Predefined stock status options for dropdown
  stockStatuses = ['In Stock', 'Out of Stock', 'Backorder'];

  // Inject inventory service via constructor
  constructor(private inventoryService: Inventory) {}

  // Execute search and apply filters
  onSearch(): void {
    // Get base results by name search
    let results = this.inventoryService.searchByName(this.searchTerm);
    
    // Apply category filter if selected
    if (this.filterCategory) {
      results = results.filter(item => item.category === this.filterCategory);
    }
    
    // Apply stock status filter if selected
    if (this.filterStock) {
      results = results.filter(item => item.stockStatus === this.filterStock);
    }
    
    // Assign final filtered results to display
    this.searchResults = results;
  }
}