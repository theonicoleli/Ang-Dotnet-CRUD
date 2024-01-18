import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPersonScreenComponent } from './edit-person-screen.component';

describe('EditPersonScreenComponent', () => {
  let component: EditPersonScreenComponent;
  let fixture: ComponentFixture<EditPersonScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditPersonScreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditPersonScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
