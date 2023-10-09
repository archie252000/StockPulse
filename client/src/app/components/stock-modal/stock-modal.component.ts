import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { SubscribeStockService } from '../../services/subscribe-stock.service';

@Component({
  selector: 'stock-modal',
  templateUrl: './stock-modal.component.html',
  styleUrls: ['./stock-modal.component.css']
})
export class StockModalComponent {

  @Input() symbol: String;
  @Input() companyName: String;
  @Output() closeModal: EventEmitter<void>
  @ViewChild('targetPrice', { static: false }) targetPrice!: ElementRef;



  constructor(private subscribeStockService: SubscribeStockService) {
    this.symbol = '';
    this.companyName = '';
    this.closeModal = new EventEmitter<void>();


  }

  onCloseModal() {

    this.closeModal.emit();

  }

  onSetAlert() {
    this.subscribeStockService.subscribeStock(this.symbol, this.targetPrice.nativeElement.value).then((response) => {
      console.log(response);

    }).catch((err) => console.log(err.message));
  }



}
