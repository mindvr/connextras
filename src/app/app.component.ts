import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DragDropTilesComponent } from './components/drag-drop-tiles/drag-drop-tiles.component';
import {SaveBoardComponent} from './components/save-board/save-board.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DragDropTilesComponent, SaveBoardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
