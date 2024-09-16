import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormField } from '@angular/material/form-field';
import { debounceTime, Subject } from 'rxjs';
import { ElementService } from '../element.service';

@Component({
  standalone: true,
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  imports: [MatFormField, MatInputModule],
})
export class SearchFieldComponent implements OnInit, OnDestroy {
  constructor(private elementService: ElementService) {}

  private searchText$ = new Subject<string>();

  getSearchText(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  ngOnInit() {
    this.searchText$.pipe(
      debounceTime(2000)
    ).subscribe((searchText: string) => {
      this.elementService.search(searchText);
    })
  }

  onSearch(searchText: string): void {
    this.searchText$.next(searchText);
  }

  ngOnDestroy(): void {
    this.searchText$.complete();
  }

}
