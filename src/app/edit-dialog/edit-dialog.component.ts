import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ElementService } from '../element.service';
import { Element } from '../element';

@Component({
  standalone: true,
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css'],
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogContent,
    MatFormField,
    MatInputModule,
    MatDialogTitle,
    ReactiveFormsModule,
  ],
})
export class EditDialogComponent {
  constructor(private elementService: ElementService) {}

  readonly dialogRef = inject(MatDialogRef<EditDialogComponent>);
  readonly data = inject(MAT_DIALOG_DATA);

  readonly formBuilder = new FormBuilder();

  form = this.formBuilder.group({
    position: new FormControl(this.data?.position ?? '', Validators.required),
    name: new FormControl(this.data?.name ?? '', Validators.required),
    weight: new FormControl(this.data?.weight ?? '', Validators.required),
    symbol: new FormControl(this.data?.symbol ?? '', Validators.required),
  })

  close(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.close();
    const element: Element = {
      id: this.data.id,
      position: Number(this.form.get('position')?.value),
      name: this.form.get('name')?.value,
      weight: Number(this.form.get('weight')?.value),
      symbol: this.form.get('symbol')?.value,
    };
    this.elementService.updateElement(element);
  }

  onCancel(): void {
    this.close();
  }
}
