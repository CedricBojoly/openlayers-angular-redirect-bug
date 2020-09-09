import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAfterMarkerClickComponent } from './page-after-marker-click.component';

describe('PageAfterMarkerClickComponent', () => {
  let component: PageAfterMarkerClickComponent;
  let fixture: ComponentFixture<PageAfterMarkerClickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageAfterMarkerClickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageAfterMarkerClickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
