import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrocerylistdialogComponent } from './grocerylistdialog.component';

describe('GrocerylistdialogComponent', () => {
  let component: GrocerylistdialogComponent;
  let fixture: ComponentFixture<GrocerylistdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrocerylistdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrocerylistdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
