// Import required modules and services
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Inventory } from '../inventory';
import { Item } from '../item.model';

// Search component metadata
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.html',
  styleUrls: ['./search.css']
})

// Search & filter component logic
export class SearchComponent implements OnInit {
  // Filter variables
  searchTerm = '';
  filterCategory = '';
  filterStock = '';
  priceRange = '';
  hasComments = false;
  filterSupplier = '';
  minQuantity = false;
  onlyPopular = false;

  // Results and stats
  searchResults: Item[] = [];
  totalCount = 0;
  totalValue = 0;
  avgPrice = 0;

  // Dropdown options
  categories = ['Electronics', 'Furniture', 'Clothing', 'Tools', 'Misc'];
  stockStatuses = ['In Stock', 'Out of Stock', 'Backorder'];
  priceRanges = [
    { label: 'Any', value: '' },
    { label: 'Under $50', value: '0-50' },
    { label: '$50 - $100', value: '50-100' },
    { label: '$100 - $500', value: '100-500' },
    { label: 'Over $500', value: '500+' }
  ];
  suppliers: string[] = [];

  // Inject inventory service
  constructor(private inventoryService: Inventory) {}

  // Initialize on load
  ngOnInit(): void {
    this.loadSuppliers();
    this.onSearch();
  }

  // Load unique suppliers for dropdown
  loadSuppliers(): void {
    const allItems = this.inventoryService.getAllItems();
    const uniqueSuppliers = new Set(allItems.map(i => i.supplier));
    this.suppliers = Array.from(uniqueSuppliers).sort();
  }

  // Perform search with all filters
  onSearch(): void {
    let results = this.inventoryService.searchByName(this.searchTerm);

    // Apply all filters
    if (this.filterCategory) results = results.filter(i => i.category === this.filterCategory);
    if (this.filterStock) results = results.filter(i => i.stockStatus === this.filterStock);
    if (this.priceRange) results = this.filterByPrice(results);
    if (this.hasComments) results = results.filter(i => i.comments?.trim());
    if (this.filterSupplier) results = results.filter(i => i.supplier === this.filterSupplier);
    if (this.minQuantity) results = results.filter(i => i.quantity >= 1);
    if (this.onlyPopular) results = results.filter(i => i.isPopular);

    this.searchResults = results;
    this.calculateStats();
  }

  // Filter items by price range
  filterByPrice(results: Item[]): Item[] {
    return results.filter(item => {
      const p = item.price;
      switch (this.priceRange) {
        case '0-50': return p < 50;
        case '50-100': return p >= 50 && p <= 100;
        case '100-500': return p > 100 && p <= 500;
        case '500+': return p > 500;
        default: return true;
      }
    });
  }

  // Calculate result statistics
  calculateStats(): void {
    this.totalCount = this.searchResults.length;
    this.totalValue = this.searchResults.reduce((s, i) => s + i.price * i.quantity, 0);
    this.avgPrice = this.totalCount ? this.totalValue / this.totalCount : 0;
  }

  // Clear all filters
  resetFilters(): void {
    this.searchTerm = this.filterCategory = this.filterStock = '';
    this.priceRange = this.filterSupplier = '';
    this.hasComments = this.minQuantity = this.onlyPopular = false;
    this.onSearch();
  }
}