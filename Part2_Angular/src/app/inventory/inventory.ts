// Import required modules and services
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Inventory } from '../inventory';
import { Item } from '../item.model';

// Component metadata
@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory.html',
  styleUrls: ['./inventory.css']
})

// Main inventory component
export class InventoryComponent implements OnInit {
  allItems: Item[] = [];          // Full item list
  displayItems: Item[] = [];      // Filtered items for view
  searchFilter = '';              // Search input value

  // Statistics
  totalItems = 0;
  lowStockCount = 0;
  totalValue = 0;
  popularCount = 0;

  // New item form data
  newItem: Omit<Item, 'id'> = {
    name: '',
    category: 'Electronics',
    quantity: 0,
    price: 0,
    supplier: '',
    stockStatus: 'In Stock',
    isPopular: false,
    comments: ''
  };

  // Edit item data
  editTargetName = '';
  editData: Partial<Omit<Item, 'id'>> = {};

  // UI feedback
  message = '';
  messageType = 'success';

  // Dropdown options
  categories = ['Electronics', 'Furniture', 'Clothing', 'Tools', 'Misc'];
  stockStatuses = ['In Stock', 'Out of Stock', 'Backorder'];

  // Inject inventory service
  constructor(private inventoryService: Inventory) { }

  // Initialize on load
  ngOnInit(): void {
    this.loadItems();
  }

  // Load all items from service
  loadItems(): void {
    this.allItems = this.inventoryService.getAllItems();
    this.applyFilter();
    this.updateStats();
  }

  // Filter items by search term
  applyFilter(): void {
    if (!this.searchFilter.trim()) {
      this.displayItems = [...this.allItems];
      return;
    }
    const term = this.searchFilter.toLowerCase();
    this.displayItems = this.allItems.filter(item =>
      item.name.toLowerCase().includes(term) ||
      item.category.toLowerCase().includes(term) ||
      item.supplier.toLowerCase().includes(term)
    );
  }

  // Update dashboard statistics
  updateStats(): void {
    this.totalItems = this.allItems.length;
    this.lowStockCount = this.allItems.filter(i => i.quantity < 5).length;
    this.totalValue = this.allItems.reduce((s, i) => s + i.price * i.quantity, 0);
    this.popularCount = this.allItems.filter(i => i.isPopular).length;
  }

  // Add new inventory item
  addItem(): void {
    const res = this.inventoryService.addItem(this.newItem);
    this.showMessage(res.message, res.success);
    if (res.success) {
      this.resetNewItem();
      this.loadItems();
    }
  }

  // Load item data for editing
  prepareEdit(): void {
    const item = this.allItems.find(i => i.name === this.editTargetName);
    item ? (this.editData = { ...item }) : this.showMessage('Item not found', false);
  }

  // Save edited item
  updateItem(): void {
    if (!this.editTargetName) return;
    const res = this.inventoryService.updateItemByName(this.editTargetName, this.editData);
    this.showMessage(res.message, res.success);
    if (res.success) this.loadItems();
  }

  // Delete item by name
  deleteItem(name: string): void {
    if (confirm(`Delete ${name}?`)) {
      const res = this.inventoryService.deleteItemByName(name);
      this.showMessage(res.message, res.success);
      if (res.success) this.loadItems();
    }
  }

  // Export items to JSON file
  exportData(): void {
    const data = JSON.stringify(this.allItems, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inventory_${new Date().toISOString().slice(0,19)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    this.showMessage('Export successful', true);
  }

  // Show success/error message
  private showMessage(msg: string, success: boolean): void {
    this.message = msg;
    this.messageType = success ? 'success' : 'error';
    setTimeout(() => this.message = '', 3000);
  }

  // Reset new item form
  private resetNewItem(): void {
    this.newItem = {
      name: '', category: 'Electronics', quantity: 0, price: 0,
      supplier: '', stockStatus: 'In Stock', isPopular: false, comments: ''
    };
  }
}