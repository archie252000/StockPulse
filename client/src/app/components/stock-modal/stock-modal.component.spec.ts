import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockModalComponent } from './stock-modal.component';

describe('StockModalComponent', () => {
  let component: StockModalComponent;
  let fixture: ComponentFixture<StockModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StockModalComponent]
    });
    fixture = TestBed.createComponent(StockModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
