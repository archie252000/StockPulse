import { Component, Input } from '@angular/core';

@Component({
  selector: 'stock-card',
  templateUrl: './stock-card.component.html',
  styleUrls: ['./stock-card.component.css']
})
export class StockCardComponent {
  @Input() symbol: String
  @Input() targetPrice: Number

  constructor() {
    this.symbol = '';
    this.targetPrice = 0.0;
  }

}
