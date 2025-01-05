import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ConnectionsBoardService} from '../../service/connections-board.service';
import {Row} from '../../service/connections-board.service';

@Component({
  selector: 'app-save-board',
  templateUrl: './save-board.component.html',
  styleUrls: ['./save-board.component.css'],
  imports: [FormsModule]
})
export class SaveBoardComponent {
  inputValue: string = '';

  constructor(private connectionsBoard: ConnectionsBoardService) {
  }

  updateValue(): void {
    // split input value by commas, trim whitespace, remove empty strings, uppercase and store in array
    let board = this.inputValue.split(',')
      .map((item) => item.trim())
      .filter((item) => item !== '')
      .map((item) => item.toUpperCase());
// split into rows of 4 elements, map each to Row object with tiles[] property and add one empty row at the end
    let rows: Row[] = board.reduce((acc: Row[], item, index) => {
      if (index % 4 === 0) {
        acc.push({id: `Row${acc.length + 1}`, tiles: []});
      }
      acc[acc.length - 1].tiles.push(item);
      return acc;
    }, []);

    // Add one empty row at the end
    rows.push({id: `Row${rows.length + 1}`, tiles: []});

    // Update the rows in the service
    this.connectionsBoard.setRows(rows);
  }
}
