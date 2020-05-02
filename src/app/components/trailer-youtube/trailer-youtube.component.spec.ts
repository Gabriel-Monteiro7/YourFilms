import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrailerYoutubeComponent } from './trailer-youtube.component';

describe('TrailerYoutubeComponent', () => {
  let component: TrailerYoutubeComponent;
  let fixture: ComponentFixture<TrailerYoutubeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrailerYoutubeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrailerYoutubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
