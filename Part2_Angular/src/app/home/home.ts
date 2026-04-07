import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Inventory } from '../inventory';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {
  totalItems = 0;
  lowStockCount = 0;
  popularCount = 0;

  constructor(private inventoryService: Inventory) {}

  ngOnInit(): void {
    const items = this.inventoryService.getAllItems();
    this.totalItems = items.length;
    this.lowStockCount = items.filter(item => item.quantity < 5).length;
    this.popularCount = items.filter(item => item.isPopular).length;
  }
}