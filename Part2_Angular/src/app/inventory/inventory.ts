import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Inventory } from '../inventory';
import { Item } from '../item.model';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory.html',
  styleUrls: ['./inventory.css']
})
export class InventoryComponent implements OnInit {
  allItems: Item[] = [];
  displayItems: Item[] = [];   
  searchFilter = '';          

  
  totalItems = 0;
  lowStockCount = 0;
  totalValue = 0;
  popularCount = 0;

 
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

  editTargetName = '';
  editData: Partial<Omit<Item, 'id'>> = {};
  message = '';
  messageType = 'success';
  categories = ['Electronics', 'Furniture', 'Clothing', 'Tools', 'Misc'];
  stockStatuses = ['In Stock', 'Out of Stock', 'Backorder'];

  constructor(private inventoryService: Inventory) { }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.allItems = this.inventoryService.getAllItems();
    this.applyFilter();          
    this.updateStats();
  }

 
  applyFilter(): void {
    if (!this.searchFilter.trim()) {
      this.displayItems = [...this.allItems];
    } else {
      const term = this.searchFilter.toLowerCase();
      this.displayItems = this.allItems.filter(item =>
        item.name.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term) ||
        item.supplier.toLowerCase().includes(term)
      );
    }
  }

  updateStats(): void {
    this.totalItems = this.allItems.length;
    this.lowStockCount = this.allItems.filter(item => item.quantity < 5).length;
    this.totalValue = this.allItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    this.popularCount = this.allItems.filter(item => item.isPopular).length;
  }

  addItem(): void {
    const result = this.inventoryService.addItem(this.newItem);
    this.showMessage(result.message, result.success);
    if (result.success) {
      this.resetNewItem();
      this.loadItems();
    }
  }

  prepareEdit(): void {
    const item = this.allItems.find(i => i.name === this.editTargetName);
    if (item) {
      this.editData = { ...item };
    } else {
      this.showMessage(`Item "${this.editTargetName}" not found.`, false);
    }
  }

  updateItem(): void {
    if (!this.editTargetName) return;
    const result = this.inventoryService.updateItemByName(this.editTargetName, this.editData);
    this.showMessage(result.message, result.success);
    if (result.success) {
      this.loadItems();
      this.editTargetName = '';
      this.editData = {};
    }
  }

  deleteItem(name: string): void {
    if (confirm(`Delete "${name}"?`)) {
      const result = this.inventoryService.deleteItemByName(name);
      this.showMessage(result.message, result.success);
      if (result.success) this.loadItems();
    }
  }

 
  exportData(): void {
    const dataStr = JSON.stringify(this.allItems, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inventory_export_${new Date().toISOString().slice(0,19)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    this.showMessage('Data exported successfully!', true);
  }

  private showMessage(msg: string, isSuccess: boolean): void {
    this.message = msg;
    this.messageType = isSuccess ? 'success' : 'error';
    setTimeout(() => this.message = '', 3000);
  }

  private resetNewItem(): void {
    this.newItem = {
      name: '', category: 'Electronics', quantity: 0, price: 0,
      supplier: '', stockStatus: 'In Stock', isPopular: false, comments: ''
    };
  }
}