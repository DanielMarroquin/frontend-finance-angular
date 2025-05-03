import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-product',
  template: `
    <div class="search-container">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" stroke-width="2">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
      <input
        type="text"
        placeholder="Buscar por nombre..."
        class="search-input"
        [(ngModel)]="searchTerm"
        (input)="onSearch()"
      >
    </div>
  `,
  styleUrls: ['./search-product.component.scss']
})
export class SearchProductComponent {
  searchTerm: string = '';
  @Output() search = new EventEmitter<string>();

  onSearch(): void {
    this.search.emit(this.searchTerm.toLowerCase());
  }
}
