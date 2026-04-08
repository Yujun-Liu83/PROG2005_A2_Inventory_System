import { TestBed } from '@angular/core/testing';
import { Inventory } from './inventory';

// Test suite for Inventory service
describe('Inventory', () => {
  let service: Inventory;  // Service instance reference

  // Setup before each test
  beforeEach(() => {
    TestBed.configureTestingModule({});  // Configure testing module (no additional providers needed)
    service = TestBed.inject(Inventory); // Inject the Inventory service
  });

  // Test: Verify service instance is created successfully
  it('should be created', () => {
    expect(service).toBeTruthy();  // Assert service exists and is truthy
  });
});