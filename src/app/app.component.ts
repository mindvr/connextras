import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {DragDropTilesComponent} from '../drag-drop-tiles/drag-drop-tiles.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DragDropTilesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
