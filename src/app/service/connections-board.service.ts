import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

export enum Group {
    None = 'none',
    Yellow = 'yellow',
    Green = 'green',
    Blue = 'blue',
    Purple = 'purple'
}

export interface Row {
    id: string;
    group: Group;
    tiles: string[];
    comment?: string;
}

@Injectable({
    providedIn: 'root'
})
export class ConnectionsBoardService {
    private rowsSubject: BehaviorSubject<Row[]>;

    constructor() {
        const savedRows = localStorage.getItem('rows');
        const initialRows: Row[] = savedRows ? JSON.parse(savedRows) : [
            {id: 'A', group: Group.None, tiles: ['CHECK', 'CLOCK', 'CRUMPLE', 'CROSS']},
            {id: 'B', group: Group.None, tiles: ['HOOK', 'TICK', 'BUCKLE', 'ANT']},
            {id: 'C', group: Group.None, tiles: ['BALL', 'STRIKE', 'MELTING', 'WAD']},
            {id: 'D', group: Group.None, tiles: ['SNAP', 'SCRUNCH', 'BRANCH', 'CLIP']}
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

    setGroup(rowId: string, group: Group): void {
        const rows = this.rowsSubject.getValue();
        const row = rows.find(r => r.id === rowId);
        if (row) {
            row.group = group;
            this.setRows(rows);
        }
    }
}
