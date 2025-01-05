import {Component, Input} from '@angular/core';
import {Row} from '../../service/connections-board.service';
import {CdkDrag, CdkDropList, CdkDragDrop} from '@angular/cdk/drag-drop';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-connections-row',
  imports: [
    CdkDropList,
    CdkDrag,
    NgForOf
  ],
  templateUrl: './connections-row.component.html',
  styleUrl: './connections-row.component.css'
})
export class ConnectionsRowComponent {
  @Input()
  row: Row = {id: '', tiles: []};

  @Input()
  drop!: (event: CdkDragDrop<Row, any>) => void;
}
