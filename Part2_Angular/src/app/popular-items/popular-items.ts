import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Inventory } from '../inventory';
import { Item } from '../item.model';

@Component({
  selector: 'app-popular-items',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popular-items.html',
  styleUrls: ['./popular-items.css']
})
export class PopularItemsComponent implements OnInit {
  popularItems: Item[] = [];
  
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

  // 销售占比数据（基于 monthlyHot 的销量）
  salesData = [
    { name: 'Wooden Desk', sales: 142, percent: 0 },
    { name: 'MacBook Pro', sales: 89, percent: 0 }
  ];

  // 统计摘要
  totalPopularItems = 0;
  totalRevenue = 0;
  avgStars = 0;

  // 精选评论
  reviews = [
    { product: 'MacBook Pro', text: 'Amazing performance, worth every penny!', author: 'Alex J.' },
    { product: 'Wooden Desk', text: 'Sturdy and beautiful, transformed my home office.', author: 'Sam K.' }
  ];

  constructor(private inventoryService: Inventory) {}

  ngOnInit(): void {
    this.popularItems = this.inventoryService.getPopularItems();
    this.calculateStats();
  }

  calculateStats(): void {
    this.totalPopularItems = this.popularItems.length;
    const totalSales = this.monthlyHot.reduce((sum, item) => sum + item.salesCount, 0);
    this.totalRevenue = this.monthlyHot.reduce((sum, item) => {
      const revNum = parseFloat(item.details.revenue.replace('$', '').replace(',', ''));
      return sum + revNum;
    }, 0);
    const totalStars = this.monthlyHot.reduce((sum, item) => sum + item.stars, 0);
    this.avgStars = totalStars / this.monthlyHot.length;

    // 计算销售占比
    this.salesData.forEach(data => {
      const item = this.monthlyHot.find(h => h.name === data.name);
      if (item) {
        data.percent = (item.salesCount / totalSales) * 100;
      }
    });
  }

  toggleDetails(item: any): void {
    item.expanded = !item.expanded;
  }

  getStarArray(stars: number): number[] {
    return Array(stars).fill(0);
  }
}