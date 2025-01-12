import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable} from 'rxjs';

export enum Group {
  None = 'none',
  Yellow = 'yellow',
  Green = 'green',
  Blue = 'blue',
  Purple = 'purple'
}

export enum AttemptResult {
  OneAway = 'oneAway',
  Miss = 'miss',
}

export interface Attempt {
  tiles: string[];
  result: AttemptResult;
}

export interface Row {
  id: string;
  group: Group;
  invalid: boolean;
  tiles: string[];
  comment?: string;
}

export interface BoardState {
  rows: Row[];
  attempts: Attempt[];
}

@Injectable({
  providedIn: 'root'
})
export class ConnectionsBoardService {
  private state: BehaviorSubject<BoardState>;

  constructor() {
    const serializedState = localStorage.getItem('board-state');
    let boardState: BoardState;
    if (serializedState === null) {
      boardState = {
        rows: [
          {id: 'A', invalid: false, group: Group.None, tiles: ['CHECK', 'CLOCK', 'CRUMPLE', 'CROSS']},
          {id: 'B', invalid: false, group: Group.None, tiles: ['HOOK', 'TICK', 'BUCKLE', 'ANT']},
          {id: 'C', invalid: false, group: Group.None, tiles: ['BALL', 'STRIKE', 'MELTING', 'WAD']},
          {id: 'D', invalid: false, group: Group.None, tiles: ['SNAP', 'SCRUNCH', 'BRANCH', 'CLIP']}
        ],
        attempts: []
      }
    } else {
      boardState = JSON.parse(serializedState);
    }
    this.state = new BehaviorSubject<BoardState>(boardState);
  }

  rows(): Observable<Row[]> {
    return this.state.asObservable().pipe(map((state: BoardState) => state.rows));
  }

  setRows(newRows: Row[], reset?: boolean): void {
    let nextState = {
      rows: [...newRows],
      attempts: reset ? [] : this.state.getValue().attempts
    };
    this.state.next(nextState);
    this.validateRows();
    localStorage.setItem('board-state', JSON.stringify(nextState));
  }

  setGroup(rowId: string, group: Group): void {
    const rows = this.state.getValue().rows;
    const row = rows.find(r => r.id === rowId);
    if (row) {
      row.group = group;
      this.setRows(rows);
    }
  }

  setComment(rowId: string, comment: string): void {
    const rows = this.state.getValue().rows;
    const row = rows.find(r => r.id === rowId);
    if (row) {
      row.comment = comment;
      this.setRows(rows);
    }
  }

  saveResult(rowId: string, result: AttemptResult): void {
    const rows = this.state.getValue().rows;
    const row = rows.find(r => r.id === rowId);
    if (row) {
      const attempt: Attempt = {
        tiles: [...row.tiles],
        result: result
      };
      this.state.next({
        rows: rows,
        attempts: [...this.state.getValue().attempts, attempt]
      });
      this.validateRows();
    }
  }

  validateRows(): void {
    const currState = this.state.getValue();
    const nextRows = [...currState.rows];
    const tileToRowIdMap = new Map<string, string>();
    nextRows.forEach(row => {
      row.invalid = false;
      row.tiles.forEach(tile => {
        tileToRowIdMap.set(tile, row.id);
      });
    });
    const invalidTiles: string[] = [];
    currState.attempts.forEach(attempt => {
      // count rowIds for each tile in attempt
      const rowCounts = new Map<string, number>();
      attempt.tiles.forEach(tile => {
        const rowId = tileToRowIdMap.get(tile);
        if (rowId) {
          const count = rowCounts.get(rowId) || 0;
          rowCounts.set(rowId, count + 1);
        }
      });
      if (attempt.result == AttemptResult.OneAway) {
        // check that rowCounts contains two keys and one value is 3
        if (rowCounts.size !== 2 || !Array.from(rowCounts.values()).includes(3)) {
          console.log('Invalid attempt: ', attempt);
          invalidTiles.push(...attempt.tiles);
        }
      } else if (attempt.result == AttemptResult.Miss) {
        // check that rowCounts contain no keys greater than 2
        if (Array.from(rowCounts.values()).some(count => count > 2)) {
          console.log('Invalid attempt: ', attempt);
          invalidTiles.push(...attempt.tiles);
        }
      }
    });
    // mark all rows with invalid tiles as invalid
    nextRows.forEach(row => {
      row.invalid = row.tiles.some(tile => invalidTiles.includes(tile));
    });
    this.state.next({
      rows: nextRows,
      attempts: currState.attempts
    });
  }
}
