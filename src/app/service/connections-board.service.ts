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
  private rowsSubject: BehaviorSubject<Row[]> = new BehaviorSubject<Row[]>([
    {id: 'A', tiles: ['CHECK', 'CLOCK', 'CRUMPLE', 'CROSS']},
    {id: 'B', tiles: ['HOOK', 'TICK', 'BUCKLE', 'ANT']},
    {id: 'C', tiles: ['BALL', 'STRIKE', 'MELTING', 'WAD']},
    {id: 'D', tiles: ['SNAP', 'SCRUNCH', 'BRANCH', 'CLIP']}
  ]);

  constructor() {
  }

  rows(): Observable<Row[]> {
    return this.rowsSubject.asObservable();
  }

  setRows(newRows: Row[]): void {
    this.rowsSubject.next([...newRows]);
  }
}
