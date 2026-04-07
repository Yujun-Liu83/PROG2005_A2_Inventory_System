import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Inventory } from '../inventory';
import { Item } from '../item.model';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.html',
  styleUrls: ['./search.css']
})
export class SearchComponent {
  searchTerm = '';
  filterCategory = '';
  filterStock = '';
  priceRange = '';
  hasComments = false;
  searchResults: Item[] = [];

  
  totalCount = 0;
  totalValue = 0;
  avgPrice = 0;

  categories = ['Electronics', 'Furniture', 'Clothing', 'Tools', 'Misc'];
  stockStatuses = ['In Stock', 'Out of Stock', 'Backorder'];
  priceRanges = [
    { label: 'Any', value: '' },
    { label: 'Under $50', value: '0-50' },
    { label: '$50 - $100', value: '50-100' },
    { label: '$100 - $500', value: '100-500' },
    { label: 'Over $500', value: '500+' }
  ];

  constructor(private inventoryService: Inventory) {}

  onSearch(): void {
    let results = this.inventoryService.searchByName(this.searchTerm);
    
    if (this.filterCategory) {
      results = results.filter(item => item.category === this.filterCategory);
    }
    if (this.filterStock) {
      results = results.filter(item => item.stockStatus === this.filterStock);
    }
    if (this.priceRange) {
      results = results.filter(item => {
        const price = item.price;
        switch (this.priceRange) {
          case '0-50': return price < 50;
          case '50-100': return price >= 50 && price <= 100;
          case '100-500': return price > 100 && price <= 500;
          case '500+': return price > 500;
          default: return true;
        }
      });
    }
    if (this.hasComments) {
      results = results.filter(item => item.comments && item.comments.trim().length > 0);
    }
    
    this.searchResults = results;
    this.calculateStats();
  }

  calculateStats(): void {
    this.totalCount = this.searchResults.length;
    this.totalValue = this.searchResults.reduce((sum, item) => sum + item.price * item.quantity, 0);
    this.avgPrice = this.totalCount ? this.totalValue / this.totalCount : 0;
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.filterCategory = '';
    this.filterStock = '';
    this.priceRange = '';
    this.hasComments = false;
    this.onSearch(); 
  }

  quickFilter(category: string): void {
    this.filterCategory = category;
    this.onSearch();
  }
}