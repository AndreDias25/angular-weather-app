import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomAdviceCardComponent } from './random-advice-card.component';

describe('RandomAdviceCardComponent', () => {
  let component: RandomAdviceCardComponent;
  let fixture: ComponentFixture<RandomAdviceCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RandomAdviceCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RandomAdviceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
