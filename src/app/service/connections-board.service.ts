import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

export interface Row {
  id: string;
  tiles: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ConnectionsBoardService {
  private rowsSubject: BehaviorSubject<Row[]>;

  constructor() {
    const savedRows = localStorage.getItem('rows');
    const initialRows: Row[] = savedRows ? JSON.parse(savedRows) : [
      { id: 'A', tiles: ['CHECK', 'CLOCK', 'CRUMPLE', 'CROSS'] },
      { id: 'B', tiles: ['HOOK', 'TICK', 'BUCKLE', 'ANT'] },
      { id: 'C', tiles: ['BALL', 'STRIKE', 'MELTING', 'WAD'] },
      { id: 'D', tiles: ['SNAP', 'SCRUNCH', 'BRANCH', 'CLIP'] }
    ];
    this.rowsSubject = new BehaviorSubject<Row[]>(initialRows);
  }

  rows(): Observable<Row[]> {
    return this.rowsSubject.asObservable();
  }

  setRows(newRows: Row[]): void {
    this.rowsSubject.next([...newRows]);
    localStorage.setItem('rows', JSON.stringify(newRows));
  }
}
