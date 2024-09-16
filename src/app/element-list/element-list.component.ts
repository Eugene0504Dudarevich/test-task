import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Element } from '../element';
import { ElementService } from '../element.service';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-element-list',
  templateUrl: './element-list.component.html',
  styleUrls: ['./element-list.component.css'],
  imports: [
    MatTableModule
  ]
})
export class ElementListComponent implements OnDestroy, OnInit {
  constructor(private elementService: ElementService,
              private dialog: MatDialog,
              private changeDetectionRef: ChangeDetectorRef) { }

  private $destroy = new Subject<void>();

  elements: Element[] = [];

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  ngOnInit(): void {
    this.getElements();
    this.elementService.elementsChanged
      .pipe(takeUntil(this.$destroy))
      .subscribe((elements: Element[]) => this.onElementsChanged(elements));
  }

  private onElementsChanged(elements: Element[]): void {
    this.elements = elements;
    this.changeDetectionRef.markForCheck();
  };

  private getElements(): void {
    this.elementService.getElements().pipe(takeUntil(this.$destroy))
      .subscribe((elements: Element[]) => {
        this.elements = elements;
      });
  }

  openEditDialog(row: Element): void {
    this.dialog.open(EditDialogComponent, { panelClass: 'edit-dialog', data: row });
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }
}
