// Import required Angular modules and services
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Inventory } from '../inventory';
import { Item } from '../item.model';

// Component metadata
@Component({
  selector: 'app-popular-items',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popular-items.html',
  styleUrls: ['./popular-items.css']
})

// Popular Items Dashboard Component
export class PopularItemsComponent implements OnInit {
  popularItems: Item[] = []; // Popular items from inventory

  // Monthly featured hot items
  monthlyHot = [
    {
      month: 'March 2026',
      name: 'Wooden Desk',
      image: 'https://picsum.photos/id/20/300/200',
      stars: 2,
      expanded: false,
      salesCount: 142,
      details: {
        revenue: '$42,558',
        description: 'Mid-century modern desk, solid oak, highly rated for home office.'
      }
    },
    {
      month: 'April 2026',
      name: 'MacBook Pro',
      image: 'https://picsum.photos/id/0/300/200',
      stars: 3,
      expanded: false,
      salesCount: 89,
      details: {
        revenue: '$177,911',
        description: '16-inch, M3 Max, 64GB RAM, best-selling laptop of the month.'
      }
    }
  ];

  // Sales data for progress bars
  salesData = [
    { name: 'Wooden Desk', sales: 142, percent: 0 },
    { name: 'MacBook Pro', sales: 89, percent: 0 }
  ];

  // Statistics
  totalPopularItems = 0;
  totalRevenue = 0;
  avgStars = 0;

  // Customer review data
  reviews = [
    { product: 'MacBook Pro', text: 'Amazing performance, worth every penny!', author: 'Alex J.' },
    { product: 'Wooden Desk', text: 'Sturdy and beautiful, transformed my home office.', author: 'Sam K.' }
  ];

  // Inject inventory service
  constructor(private inventoryService: Inventory) {}

  // Initialize data on load
  ngOnInit(): void {
    this.popularItems = this.inventoryService.getPopularItems();
    this.calculateStats();
  }

  // Calculate stats: revenue, rating, sales percentage
  calculateStats(): void {
    this.totalPopularItems = this.popularItems.length;
    const totalSales = this.monthlyHot.reduce((sum, item) => sum + item.salesCount, 0);
    
    // Calculate total revenue
    this.totalRevenue = this.monthlyHot.reduce((sum, item) => {
      const revNum = parseFloat(item.details.revenue.replace(/[$,]/g, ''));
      return sum + revNum;
    }, 0);

    // Calculate average stars
    const totalStars = this.monthlyHot.reduce((sum, item) => sum + item.stars, 0);
    this.avgStars = totalStars / this.monthlyHot.length;

    // Calculate sales percentage for progress bars
    this.salesData.forEach(data => {
      const item = this.monthlyHot.find(h => h.name === data.name);
      if (item) data.percent = (item.salesCount / totalSales) * 100;
    });
  }

  // Toggle expand/collapse item details
  toggleDetails(item: any): void {
    item.expanded = !item.expanded;
  }

  // Create array for star rating display
  getStarArray(stars: number): number[] {
    return Array(stars).fill(0);
  }
}