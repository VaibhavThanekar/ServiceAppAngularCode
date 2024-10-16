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

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-dialog-yes-no',
  templateUrl: './dialog-yes-no.component.html',
  styleUrl: './dialog-yes-no.component.css'
  // standalone: false,
  // imports: [MatButtonModule],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})

export class DialogYesNoComponent {

  
  // readonly dialog = inject(MatDialog);
  constructor(public dialogRef: MatDialogRef<DialogYesNoComponent>) {}

  public confirmMessage:string;
  public dialogTitle:string;
  public closeComment:string;

  // openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
  //   this.dialog.open(DialogAnimationsExampleDialog, {
  //     width: '250px',
  //     enterAnimationDuration,
  //     exitAnimationDuration,
  //   });
  // }
}
// export class DialogAnimationsExampleDialog {
//   readonly dialogRef = inject(MatDialogRef<DialogAnimationsExampleDialog>);
// }
