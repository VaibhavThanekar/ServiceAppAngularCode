import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-yes-no',
  templateUrl: './dialog-yes-no.component.html',
  styleUrl: './dialog-yes-no.component.css'
})

export class DialogYesNoComponent {

  constructor(public dialogRef: MatDialogRef<DialogYesNoComponent>) {}

  public confirmMessage:string;
  public dialogTitle:string;
  public closeComment:string;
}
