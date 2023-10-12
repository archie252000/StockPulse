import { Component, ElementRef, ViewChild } from '@angular/core';
import { SearchService } from '../../services/search.service'
import axios from 'axios';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @ViewChild('searchQuery', { static: false }) searchQuery!: ElementRef;

  searchResults: Array<any>
  showResults: Boolean
  showOverlay: Boolean
  showStockModal: Boolean
  selectedStockSymbol: String
  selectedStockCompany: String

  constructor(private searchService: SearchService) {
    this.searchResults = [];
    this.showOverlay = false;
    this.showResults = false;
    this.showStockModal = false;
    this.selectedStockSymbol = "";
    this.selectedStockCompany = "";
  }

  onInputChange(): void {
    const value = this.searchQuery.nativeElement.value;
    if (value == '') {
      this.searchResults = [];
      this.showOverlay = false;
      this.showResults = false;
    }
  }


  onSearchClick(): void {

    const value = this.searchQuery.nativeElement.value;

    this.searchService.search(value)
      .then((response) => {
        this.searchResults = response.data.matches;
        if (!this.searchResults)
          this.searchResults = [];
        if (this.searchResults.length > 0) {
          this.showOverlay = true;
          this.showResults = true;
        } else {

          this.showOverlay = false;
          this.showResults = false;
        }
      })
      .catch((err) => {
        console.error("Error: " + err.message);
        this.showOverlay = false;
        this.showResults = false;
      });


  }

  onItemClick(symbol: String, companyName: String): void {
    this.showStockModal = true;
    this.showResults = false;
    this.showOverlay = true;
    this.selectedStockSymbol = symbol;
    this.selectedStockCompany = companyName;
  }

  closeModal(): void {
    this.showStockModal = false;
    this.showResults = true;

  }

}
