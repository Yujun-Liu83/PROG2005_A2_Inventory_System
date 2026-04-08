import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app';

// Test suite for AppComponent
describe('App', () => {
  // Setup before each test - configure testing module
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],  // Import standalone component
    }).compileComponents();     // Compile component templates
  });

  // Test 1: Verify component instance creation
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);  // Create component instance
    const app = fixture.componentInstance;                  // Get component instance
    expect(app).toBeTruthy();                               // Assert component exists
  });

  // Test 2: Verify title renders correctly in DOM
  it('should render title', async () => {
    const fixture = TestBed.createComponent(AppComponent);  // Create component instance
    await fixture.whenStable();                             // Wait for async operations
    const compiled = fixture.nativeElement as HTMLElement;  // Get native DOM element
    // Assert h1 contains expected title text
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, Part2_Angular');
  });
});