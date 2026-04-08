// Import required Angular core modules
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Component decorator with metadata
@Component({
  selector: 'app-help',        // Component tag name
  standalone: true,            // Standalone component mode
  imports: [CommonModule, FormsModule],  // Required modules
  templateUrl: './help.html',  // HTML template path
  styleUrls: ['./help.css']    // CSS style path
})

// Help Center main component class
export class HelpComponent {
  
  // Search input binding value
  searchQuery = '';

  // Help category & FAQ data list
  helpCategories = [
    {
      name: 'Getting Started',
      icon: '🚀',
      questions: [
        { q: 'What is this inventory system?', a: 'This is a web-based inventory management application built with Angular and TypeScript. It allows you to add, edit, delete, search, and track popular items without server-side persistence.' },
        { q: 'Do I need to create an account?', a: 'No, the app runs entirely in your browser. No login or account is required. All data is stored temporarily in memory.' }
      ]
    },
    {
      name: 'Inventory Management',
      icon: '📦',
      questions: [
        { q: 'How do I add a new item?', a: 'Go to the Inventory page, fill in the "Add New Item" form (all fields except comments are required), then click "Add Item". The item will appear in the table below.' },
        { q: 'How do I edit an existing item?', a: 'On the Inventory page, scroll down to "Edit Item by Name". Enter the current item name, click "Load Data", modify the fields, and click "Save Changes". The item name can also be changed.' },
        { q: 'How do I delete an item?', a: 'Each row in the "All Items" table has a "Delete" button. Click it and confirm the deletion. This action cannot be undone.' }
      ]
    },
    {
      name: 'Search & Filters',
      icon: '🔍',
      questions: [
        { q: 'How does the search work?', a: 'The Search page allows you to search by item name (partial match), filter by category, stock status, price range, and whether the item has comments.' },
        { q: 'Can I see statistics of my search results?', a: 'Yes, after performing a search, the page shows the number of items found, total inventory value, and average price.' }
      ]
    },
    {
      name: 'Privacy & Security',
      icon: '🔒',
      questions: [
        { q: 'Is my data saved permanently?', a: 'No, all data is stored in your browser’s memory only. Refreshing the page or closing the tab will reset the data to the default sample items. This meets the assignment requirement of no server-side persistence.' },
        { q: 'What security measures are in place?', a: 'The app uses Angular’s built-in sanitization to prevent XSS attacks, validates all user inputs, and requests no device permissions. No data is transmitted to external servers.' }
      ]
    },
    {
      name: 'Troubleshooting',
      icon: '⚙️',
      questions: [
        { q: 'The page looks broken on mobile?', a: 'The application is fully responsive. If you see misalignment, try rotating your device to landscape or ensure you have the latest browser version. The tables will convert to block display on narrow screens.' },
        { q: 'I cannot delete an item – what should I do?', a: 'Make sure you click the "Delete" button and confirm the popup. If the item still persists, refresh the page and try again. If the problem continues, contact support.' },
        { q: 'Why are my changes not saved after refresh?', a: 'As mentioned, data is only stored in memory. To keep changes, you would need to implement a backend, which is outside the scope of this assignment.' }
      ]
    }
  ];

  // Store expand/collapse state for each FAQ item
  expandedStates: { [key: string]: boolean } = {};

  // Toggle FAQ expand/collapse status
  toggleQuestion(catIndex: number, qIndex: number): void {
    const key = `${catIndex}-${qIndex}`;
    this.expandedStates[key] = !this.expandedStates[key];
  }

  // Check if a specific FAQ item is expanded
  isExpanded(catIndex: number, qIndex: number): boolean {
    const key = `${catIndex}-${qIndex}`;
    return this.expandedStates[key] || false;
  }
}