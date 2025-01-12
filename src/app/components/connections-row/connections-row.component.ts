import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {Row, Group, AttemptResult, ConnectionsBoardService} from '../../service/connections-board.service';
import {CdkDrag, CdkDropList, CdkDragDrop} from '@angular/cdk/drag-drop';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-connections-row',
  imports: [
    CdkDropList,
    CdkDrag,
    NgForOf,
    NgClass,
    FormsModule,
    NgIf
  ],
  templateUrl: './connections-row.component.html',
  styleUrl: './connections-row.component.css'
})
export class ConnectionsRowComponent {
  @Input()
  row: Row = {id: '', invalid: false, group: Group.None, tiles: []};

  @Input()
  drop!: (event: CdkDragDrop<Row, any>) => void;

  isEditingComment: boolean = false;
  editedComment: string = '';
  @ViewChild('commentInput', { static: false }) commentInputRef?: ElementRef<HTMLInputElement>;


  constructor(private connectionsBoard: ConnectionsBoardService) {}

  setGroup(rowId: string, group: Group): void {
    this.connectionsBoard.setGroup(rowId, group);
  }

  protected readonly Group = Group;
  protected readonly AttemptResult = AttemptResult;

  startEditingComment(): void {
    this.isEditingComment = true;
    this.editedComment = this.row.comment || '';

    setTimeout(() => {
      if (this.commentInputRef?.nativeElement) {
        this.commentInputRef.nativeElement.focus();
      }
    }, 10);
  }

  saveComment(): void {
    this.isEditingComment = false;
    this.connectionsBoard.setComment(this.row.id, this.editedComment);
  }

  saveResult(rowId: string, result: AttemptResult): void {
    this.connectionsBoard.saveResult(rowId, result);
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.saveComment();
    }
  }
}
