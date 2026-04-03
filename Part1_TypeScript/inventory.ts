
// Define the structure of an inventory item
export interface Item {
    itemId: string;                 // Unique ID, format: ITEM-0001
    itemName: string;               // Name of the item
    category: 'Electronics' | 'Furniture' | 'Clothing' | 'Tools' | 'Miscellaneous';
    quantity: number;               // Number of items in stock
    price: number;                  // Price per unit
    supplierName: string;           // Supplier of the item
    stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock'; // Auto-updated based on quantity
    isPopular: boolean;             // Whether the item is marked as popular
    comment?: string;               // Optional comment
}

// In-memory array that holds all inventory items
export let inventory: Item[] = [];

// Validate item ID format: must start with "ITEM-" followed by exactly 4 digits
export function isValidItemId(itemId: string): boolean {
    return /^ITEM-\d{4}$/.test(itemId);
}

// Add a new item to the inventory with validation
export function addItem(item: Item): { success: boolean; message: string } {
    // Check ID format
    if (!isValidItemId(item.itemId)) {
        return { success: false, message: "Invalid ID format. Must be ITEM-0001" };
    }
    // Check for duplicate ID
    if (inventory.some(i => i.itemId === item.itemId)) {
        return { success: false, message: "ID already exists" };
    }
    // Automatically set stock status based on quantity
    if (item.quantity === 0) item.stockStatus = 'Out of Stock';
    else if (item.quantity <= 5) item.stockStatus = 'Low Stock';
    else item.stockStatus = 'In Stock';
    // Add to inventory array
    inventory.push(item);
    return { success: true, message: "Item added" };
}

// Remove an item by its name (as required by the assignment)
export function removeItemByName(itemName: string): { success: boolean; message: string } {
    const index = inventory.findIndex(i => i.itemName === itemName);
    if (index === -1) {
        return { success: false, message: `No item named "${itemName}"` };
    }
    inventory.splice(index, 1);
    return { success: true, message: `Removed "${itemName}"` };
}

// Update an existing item by its current name (partial update allowed)
export function updateItemByName(
    oldName: string,
    updatedData: Partial<Omit<Item, 'itemId'>>
): { success: boolean; message: string } {
    // Find the item by its current name
    const item = inventory.find(i => i.itemName === oldName);
    if (!item) {
        return { success: false, message: `Item "${oldName}" not found` };
    }
    // Apply each provided field (ID cannot be changed)
    if (updatedData.itemName !== undefined) item.itemName = updatedData.itemName;
    if (updatedData.category !== undefined) item.category = updatedData.category;
    if (updatedData.quantity !== undefined) {
        item.quantity = updatedData.quantity;
    
        if (item.quantity === 0) item.stockStatus = 'Out of Stock';
        else if (item.quantity <= 5) item.stockStatus = 'Low Stock';
        else item.stockStatus = 'In Stock';
    }
    if (updatedData.price !== undefined) item.price = updatedData.price;
    if (updatedData.supplierName !== undefined) item.supplierName = updatedData.supplierName;
    if (updatedData.isPopular !== undefined) item.isPopular = updatedData.isPopular;
    if (updatedData.comment !== undefined) item.comment = updatedData.comment;
    return { success: true, message: `Updated "${oldName}"` };
}

// Retrieve all items in the inventory
export function getAllItems(): { success: boolean; message: string; items: Item[] } {
    return { success: true, message: `Total ${inventory.length}`, items: [...inventory] };
}

// Retrieve only items marked as popular
export function getPopularItems(): { success: boolean; message: string; items: Item[] } {
    const popular = inventory.filter(i => i.isPopular === true);
    return { success: true, message: `Found ${popular.length}`, items: popular };
}

// Search items by name or ID (case-insensitive, partial match)
export function searchItems(keyword: string): { success: boolean; message: string; items: Item[] } {
    const lower = keyword.toLowerCase();
    const matched = inventory.filter(i =>
        i.itemName.toLowerCase().includes(lower) ||
        i.itemId.toLowerCase().includes(lower)
    );
    return { success: true, message: `Found ${matched.length}`, items: matched };
}

// Seed initial test data if inventory is empty
export function seedTestData(): { success: boolean; message: string } {
    if (inventory.length > 0) {
        return { success: false, message: "Already has data" };
    }
    const testItems: Item[] = [
        { itemId: "ITEM-0001", itemName: "Laptop", category: "Electronics", quantity: 10, price: 999, supplierName: "Tech Supplier", stockStatus: "In Stock", isPopular: true, comment: "High performance" },
        { itemId: "ITEM-0002", itemName: "Desk Chair", category: "Furniture", quantity: 3, price: 199, supplierName: "Furniture Co.", stockStatus: "Low Stock", isPopular: false },
        { itemId: "ITEM-0003", itemName: "T-Shirt", category: "Clothing", quantity: 0, price: 29, supplierName: "Apparel Shop", stockStatus: "Out of Stock", isPopular: true }
    ];
    testItems.forEach(item => addItem(item));
    return { success: true, message: `Seeded ${testItems.length} items` };
}