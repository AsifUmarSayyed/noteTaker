import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaltComponent } from './defalt.component';

describe('DefaltComponent', () => {
  let component: DefaltComponent;
  let fixture: ComponentFixture<DefaltComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaltComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
