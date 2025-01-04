import {Component} from '@angular/core';
import {
  CdkDragDrop,
  transferArrayItem,
  moveItemInArray,
  CdkDropList,
  CdkDrag,
  CdkDropListGroup
} from '@angular/cdk/drag-drop';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-drag-drop-tiles',
  templateUrl: './drag-drop-tiles.component.html',
  imports: [
    CdkDropList,
    NgForOf,
    CdkDrag,
    CdkDropListGroup
  ],
  styleUrls: ['./drag-drop-tiles.component.css']
})
export class DragDropTilesComponent {

  rows = [
    {"id": "A", "tiles": ["CHECK", "CLOCK", "CRUMPLE", "CROSS"]},
    {"id": "B", "tiles": ["HOOK", "TICK", "BUCKLE", "ANT"]},
    {"id": "C", "tiles": ["BALL", "STRIKE", "MELTING", "WAD"]},
    {"id": "D", "tiles": ["SNAP", "SCRUNCH", "BRANCH", "CLIP"]},
  ]

  drop(event: CdkDragDrop<{ id: string; tiles: string[] }, any>) {
    console.log(event);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data.tiles, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data.tiles,
        event.container.data.tiles,
        event.previousIndex,
        event.currentIndex);
    }
  }

  rearrange(event: CdkDragDrop<({
    id: string;
    tiles: string[]
  })[], any>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }
}
