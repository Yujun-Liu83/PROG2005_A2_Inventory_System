import { Injectable } from '@angular/core';
import { Item } from './item.model';

@Injectable({ providedIn: 'root' })  // Service available app-wide as singleton
export class Inventory {
  private items: Item[] = [];   // Internal items array
  private nextId = 1;           // Auto-increment ID counter

  constructor() {
    // Seed initial data with sample items
    this.items.push({
      id: this.nextId++,
      name: 'MacBook Pro',
      category: 'Electronics',
      quantity: 10,
      price: 1999,
      supplier: 'Apple Inc.',
      stockStatus: 'In Stock',
      isPopular: true,
      comments: 'High performance laptop'
    });
    this.items.push({
      id: this.nextId++,
      name: 'Wooden Desk',
      category: 'Furniture',
      quantity: 5,
      price: 299,
      supplier: 'IKEA',
      stockStatus: 'In Stock',
      isPopular: false,
      comments: 'Minimalist style'
    });
    this.items.push({
      id: this.nextId++,
      name: "Levi's Jeans",
      category: 'Clothing',
      quantity: 0,
      price: 89,
      supplier: "Levi's",
      stockStatus: 'Out of Stock',
      isPopular: false,
      comments: ''
    });
  }

  // Returns a copy of all items (immutable)
  getAllItems(): Item[] {
    return [...this.items];
  }

  // Filters items by name (case-insensitive, partial match)
  searchByName(name: string): Item[] {
    const lowerName = name.toLowerCase().trim();
    return this.items.filter(item => item.name.toLowerCase().includes(lowerName));
  }

  // Returns only popular items
  getPopularItems(): Item[] {
    return this.items.filter(item => item.isPopular === true);
  }

  // Adds a new item with validation
  addItem(item: Omit<Item, 'id'>): { success: boolean; message: string } {
    // Check for duplicate name
    if (this.items.some(i => i.name === item.name)) {
      return { success: false, message: 'Item name already exists.' };
    }
    // Validate quantity
    if (item.quantity < 0 || isNaN(item.quantity)) {
      return { success: false, message: 'Quantity must be non-negative.' };
    }
    // Validate price
    if (item.price <= 0 || isNaN(item.price)) {
      return { success: false, message: 'Price must be positive.' };
    }
    // Create and add new item
    const newItem: Item = { ...item, id: this.nextId++ };
    this.items.push(newItem);
    return { success: true, message: 'Item added successfully!' };
  }

  // Updates an existing item by name with partial data
  updateItemByName(name: string, updatedData: Partial<Omit<Item, 'id'>>): { success: boolean; message: string } {
    const index = this.items.findIndex(i => i.name === name);
    if (index === -1) {
      return { success: false, message: `Item "${name}" not found.` };
    }
    // Check name uniqueness if changing name
    if (updatedData.name && updatedData.name !== name) {
      if (this.items.some(i => i.name === updatedData.name)) {
        return { success: false, message: 'New name already exists.' };
      }
    }
    // Validate quantity if provided
    if (updatedData.quantity !== undefined && (updatedData.quantity < 0 || isNaN(updatedData.quantity))) {
      return { success: false, message: 'Quantity must be non-negative.' };
    }
    // Validate price if provided
    if (updatedData.price !== undefined && (updatedData.price <= 0 || isNaN(updatedData.price))) {
      return { success: false, message: 'Price must be positive.' };
    }
    // Merge updated data
    this.items[index] = { ...this.items[index], ...updatedData };
    return { success: true, message: `Item "${name}" updated successfully.` };
  }

  // Deletes an item by name
  deleteItemByName(name: string): { success: boolean; message: string } {
    const index = this.items.findIndex(i => i.name === name);
    if (index === -1) {
      return { success: false, message: `Item "${name}" not found.` };
    }
    this.items.splice(index, 1);
    return { success: true, message: `Item "${name}" deleted.` };
  }
}