import { Component } from '@angular/core';
import { ElementListComponent } from './element-list/element-list.component';
import { SearchFieldComponent } from './search-field/search-field.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ElementListComponent, SearchFieldComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'test-app';
}
