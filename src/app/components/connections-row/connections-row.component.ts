import {Component, Input} from '@angular/core';
import {Row, Group, ConnectionsBoardService} from '../../service/connections-board.service';
import {CdkDrag, CdkDropList, CdkDragDrop} from '@angular/cdk/drag-drop';
import {NgClass, NgForOf} from '@angular/common';

@Component({
  selector: 'app-connections-row',
  imports: [
    CdkDropList,
    CdkDrag,
    NgForOf,
    NgClass
  ],
  templateUrl: './connections-row.component.html',
  styleUrl: './connections-row.component.css'
})
export class ConnectionsRowComponent {
  @Input()
  row: Row = {id: '', group: Group.None, tiles: []};

  @Input()
  drop!: (event: CdkDragDrop<Row, any>) => void;

  constructor(private connectionsBoard: ConnectionsBoardService) {}

  setGroup(rowId: string, group: Group): void {
    this.connectionsBoard.setGroup(rowId, group);
  }

  protected readonly Group = Group;
}
