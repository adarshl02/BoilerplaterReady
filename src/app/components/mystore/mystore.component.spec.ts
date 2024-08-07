import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MystoreComponent } from './mystore.component';

describe('MystoreComponent', () => {
  let component: MystoreComponent;
  let fixture: ComponentFixture<MystoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MystoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MystoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
