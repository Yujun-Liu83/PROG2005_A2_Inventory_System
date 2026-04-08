// Import required Angular modules and services
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Inventory } from '../inventory';
import { Item } from '../item.model';

// Home component metadata
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})

// Home dashboard component
export class HomeComponent implements OnInit {
  totalItems = 0;             // Total inventory items
  lowStockCount = 0;          // Items with stock < 5
  popularCount = 0;           // Marked popular items
  recentItems: Item[] = [];   // Last 4 added items

  // Inject inventory service
  constructor(private inventoryService: Inventory) {}

  // Initialize data on load
  ngOnInit(): void {
    const items = this.inventoryService.getAllItems();
    
    // Calculate stats
    this.totalItems = items.length;
    this.lowStockCount = items.filter(item => item.quantity < 5).length;
    this.popularCount = items.filter(item => item.isPopular).length;
    
    // Get latest 4 items
    this.recentItems = [...items].reverse().slice(0, 4);
  }
}