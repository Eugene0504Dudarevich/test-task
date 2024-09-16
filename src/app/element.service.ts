import { EventEmitter, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Element } from './element';
import { ELEMENTS } from './mock-elements';


@Injectable({ providedIn: 'root' })
export class ElementService {
  elementsChanged = new EventEmitter<Element[]>();

  elements: Element[] = [];

  getElements(): Observable<Element[]> {
    this.elements = ELEMENTS;
    return of(this.elements);
  }

  updateElement(element: Element) {
    const updatedElements = this.elements.map((item: Element) => item.id === element.id ? { ...item, ...element } : item);
    this.elements = updatedElements;
    this.elementsChanged.emit(updatedElements);
  }

  search(searchText: string): Observable<string> {
    const filteredElements = this.elements.filter((element: Element) =>
      element.name.includes(searchText) || element.position === +searchText
      || element.symbol.includes(searchText) || element.weight === +searchText
    );
    this.elementsChanged.emit(filteredElements);
    return of('');
  }

}
