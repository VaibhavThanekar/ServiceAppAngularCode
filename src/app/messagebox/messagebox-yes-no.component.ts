import {ChangeDetectionStrategy, Component, inject, Injectable } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-messagebox-yes-no',
  templateUrl: './messagebox-yes-no.component.html',
  styleUrl: './messagebox-yes-no.component.css'
})
export class MessageboxYesNoComponent {
  // public dialogRef: MatDialogRef<MessageboxYesNoComponent>
  
  public confirmMessage:string;
  public dialogTitle:string;
  public closeComment:string;

  public dialogRef: MatDialogRef<MessageboxYesNoComponent>
  readonly dialogs = inject(MatDialog);

  public openDialog(enterAnimationDuration: string, exitAnimationDuration: string, message:string, dialogTitle:string): void {
    this.dialogRef =  this.dialogs.open(MessageboxYesNoComponent, {
     width: '550px',
     enterAnimationDuration,
     exitAnimationDuration,
     
   }); 
   this.dialogRef.componentInstance.confirmMessage = message;
   this.dialogRef.componentInstance.dialogTitle = dialogTitle;
   this.dialogRef.disableClose = true;
  }
}
