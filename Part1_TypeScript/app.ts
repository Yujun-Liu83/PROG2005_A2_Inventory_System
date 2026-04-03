// app.ts - UI interaction and DOM manipulation for the inventory system

import {
    addItem, removeItemByName, updateItemByName,
    searchItems, getAllItems, getPopularItems, seedTestData,
    Item
} from './inventory.js';

// Display a temporary message on the page (replaces alert())
function showMessage(msg: string, isError: boolean = false) {
    const msgDiv = document.getElementById('message')!;
    msgDiv.textContent = msg;
    msgDiv.className = `message ${isError ? 'error' : 'success'}`;
    // Automatically clear the message after 3 seconds
    setTimeout(() => {
        msgDiv.textContent = '';
        msgDiv.className = 'message';
    }, 3000);
}

// Render the "All Items" table dynamically
function renderAllItems() {
    const result = getAllItems();
    const tbody = document.getElementById('allItemsBody')!;
    if (!result.success || result.items.length === 0) {
        tbody.innerHTML = `<td><td colspan="9">No items</td></tr>`;
        return;
    }
    // Build table rows using template literals
    tbody.innerHTML = result.items.map(item => `
        <tr>
            <td>${item.itemId}</td>
            <td>${item.itemName}</td>
            <td>${item.category}</td>
            <td>${item.quantity}</td>
            <td>$${item.price}</td>
            <td>${item.supplierName}</td>
            <td class="status-${item.stockStatus.replace(/\s/g, '')}">${item.stockStatus}</td>
            <td>${item.isPopular ? 'Yes' : 'No'}</td>
            <td>${item.comment || '-'}</td>
        </tr>
    `).join('');
}

// Render the "Popular Items" table (only items with isPopular = true)
function renderPopularItems() {
    const result = getPopularItems();
    const tbody = document.getElementById('popularBody')!;
    if (!result.success || result.items.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5">No popular items</td></tr>`;
        return;
    }
    tbody.innerHTML = result.items.map(item => `
        <tr>
            <td>${item.itemId}</td>
            <td>${item.itemName}</td>
            <td>${item.category}</td>
            <td>${item.quantity}</td>
            <td>$${item.price}</td>
        </tr>
    `).join('');
}

// Refresh both tables after any data modification
function refreshUI() {
    renderAllItems();
    renderPopularItems();
}

document.getElementById('addForm')!.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent page reload

    // Get form values
    const id = (document.getElementById('addId') as HTMLInputElement).value.trim();
    const name = (document.getElementById('addName') as HTMLInputElement).value.trim();
    const category = (document.getElementById('addCategory') as HTMLSelectElement).value as Item['category'];
    const qty = parseInt((document.getElementById('addQty') as HTMLInputElement).value);
    const price = parseFloat((document.getElementById('addPrice') as HTMLInputElement).value);
    const supplier = (document.getElementById('addSupplier') as HTMLInputElement).value.trim();
    const isPopular = (document.getElementById('addPopular') as HTMLInputElement).checked;
    const comment = (document.getElementById('addComment') as HTMLInputElement).value.trim() || undefined;

    // Basic validation
    if (!id || !name || !supplier || isNaN(qty) || isNaN(price)) {
        showMessage('Please fill all required fields', true);
        return;
    }

    const newItem: Item = {
        itemId: id, itemName: name, category, quantity: qty,
        price, supplierName: supplier, stockStatus: 'In Stock',
        isPopular, comment
    };
    const result = addItem(newItem);
    if (result.success) {
        showMessage(result.message);
        refreshUI();          // Update tables
        (e.target as HTMLFormElement).reset(); // Clear form
    } else {
        showMessage(result.message, true);
    }
});

document.getElementById('editForm')!.addEventListener('submit', (e) => {
    e.preventDefault();

    const oldName = (document.getElementById('editOldName') as HTMLInputElement).value.trim();
    if (!oldName) {
        showMessage('Enter current name', true);
        return;
    }

    // Collect only fields that the user wants to change
    const newName = (document.getElementById('editNewName') as HTMLInputElement).value.trim();
    const category = (document.getElementById('editCategory') as HTMLSelectElement).value as Item['category'] || undefined;
    const qty = (document.getElementById('editQty') as HTMLInputElement).value;
    const price = (document.getElementById('editPrice') as HTMLInputElement).value;
    const supplier = (document.getElementById('editSupplier') as HTMLInputElement).value.trim();
    const isPopularChecked = (document.getElementById('editPopular') as HTMLInputElement).checked;
    const comment = (document.getElementById('editComment') as HTMLInputElement).value.trim();

    const updateData: Partial<Omit<Item, 'itemId'>> = {};
    if (newName) updateData.itemName = newName;
    if (category) updateData.category = category;
    if (qty !== '') updateData.quantity = parseInt(qty);
    if (price !== '') updateData.price = parseFloat(price);
    if (supplier) updateData.supplierName = supplier;
    if (isPopularChecked) updateData.isPopular = true;
    if (comment) updateData.comment = comment;

    if (Object.keys(updateData).length === 0) {
        showMessage('No changes provided', true);
        return;
    }

    const result = updateItemByName(oldName, updateData);
    if (result.success) {
        showMessage(result.message);
        refreshUI();
        (e.target as HTMLFormElement).reset();
    } else {
        showMessage(result.message, true);
    }
});

// ---- Delete Item Form Handler (by name with confirmation) ----
document.getElementById('deleteForm')!.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = (document.getElementById('deleteName') as HTMLInputElement).value.trim();
    if (!name) {
        showMessage('Enter item name', true);
        return;
    }
    // Show confirmation dialog (allowed, as it's not an alert for normal messages)
    if (confirm(`Are you sure you want to delete item "${name}"?`)) {
        const result = removeItemByName(name);
        if (result.success) {
            showMessage(result.message);
            refreshUI();
            (e.target as HTMLFormElement).reset();
        } else {
            showMessage(result.message, true);
        }
    }
});

// ---- Search Button Handler ----
document.getElementById('searchBtn')!.addEventListener('click', () => {
    const keyword = (document.getElementById('searchInput') as HTMLInputElement).value.trim();
    if (!keyword) {
        showMessage('Enter search keyword', true);
        return;
    }
    const result = searchItems(keyword);
    const resultDiv = document.getElementById('searchResult')!;
    if (result.success && result.items.length > 0) {
        resultDiv.innerHTML = `<strong>${result.items.length} result(s):</strong><ul>` +
            result.items.map(i => `<li>${i.itemId} - ${i.itemName} (${i.category})</li>`).join('') + '</ul>';
    } else {
        resultDiv.innerHTML = '<span class="error">No matching items</span>';
    }
});

// ---- Initialization ----
seedTestData();   // Populate with sample data if empty
refreshUI();      // Render tables on page load