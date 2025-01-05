import {Component, OnInit} from '@angular/core';
import {
  CdkDragDrop,
  transferArrayItem,
  moveItemInArray,
  CdkDropList,
  CdkDropListGroup
} from '@angular/cdk/drag-drop';
import {NgForOf} from '@angular/common';
import {ConnectionsBoardService, Row} from '../../service/connections-board.service';
import {ConnectionsRowComponent} from '../connections-row/connections-row.component';


@Component({
  selector: 'app-drag-drop-tiles',
  templateUrl: './drag-drop-tiles.component.html',
  imports: [
    CdkDropList,
    NgForOf,
    CdkDropListGroup,
    ConnectionsRowComponent
  ],
  styleUrls: ['./drag-drop-tiles.component.css']
})
export class DragDropTilesComponent implements OnInit {

  rows: Row[] = []

  constructor(private connectionsBoard: ConnectionsBoardService) {
  }

  ngOnInit(): void {
    this.connectionsBoard.rows().subscribe((rows: Row[]) => {
      this.rows = rows;
    })
  }

  drop= (event: CdkDragDrop<Row, any>) => {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data.tiles, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data.tiles,
        event.container.data.tiles,
        event.previousIndex,
        event.currentIndex);
    }
    this.connectionsBoard.setRows(this.rows);
  }

  rearrange(event: CdkDragDrop<Row[], any>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    this.connectionsBoard.setRows(this.rows);
  }
}
