import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Inventory } from '../inventory';      
import { Item } from '../item.model';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.html',   
  styleUrls: ['./inventory.css']
})
export class InventoryComponent implements OnInit {
  allItems: Item[] = [];
  
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
  }

  addItem(): void {
    const result = this.inventoryService.addItem(this.newItem);
    this.showMessage(result.message, result.success);
    if (result.success) {
      this.newItem = {
        name: '',
        category: 'Electronics',
        quantity: 0,
        price: 0,
        supplier: '',
        stockStatus: 'In Stock',
        isPopular: false,
        comments: ''
      };
      this.loadItems();
    }
  }

  prepareEdit(): void {
    const item = this.allItems.find(i => i.name === this.editTargetName);
    if (item) {
      this.editData = {
        name: item.name,
        category: item.category,
        quantity: item.quantity,
        price: item.price,
        supplier: item.supplier,
        stockStatus: item.stockStatus,
        isPopular: item.isPopular,
        comments: item.comments
      };
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
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      const result = this.inventoryService.deleteItemByName(name);
      this.showMessage(result.message, result.success);
      if (result.success) this.loadItems();
    }
  }

  private showMessage(msg: string, isSuccess: boolean): void {
    this.message = msg;
    this.messageType = isSuccess ? 'success' : 'error';
    setTimeout(() => this.message = '', 3000);
  }
}