import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragDropTilesComponent } from './drag-drop-tiles.component';

describe('DragDropTilesComponent', () => {
  let component: DragDropTilesComponent;
  let fixture: ComponentFixture<DragDropTilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DragDropTilesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DragDropTilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
