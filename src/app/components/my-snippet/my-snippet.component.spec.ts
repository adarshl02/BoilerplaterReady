import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySnippetComponent } from './my-snippet.component';

describe('MySnippetComponent', () => {
  let component: MySnippetComponent;
  let fixture: ComponentFixture<MySnippetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MySnippetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MySnippetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
