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
  selector: 'app-messagebox-ok',
  templateUrl: './messagebox-ok.component.html',
  styleUrl: './messagebox-ok.component.css'
})
export class MessageboxOkComponent {
  // constructor(public dialogRef: MatDialogRef<MessageboxOkComponent>) {}

  public message:string;
  public dialogTitle:string;
  public closeComment:string;

  public dialogRef: MatDialogRef<MessageboxOkComponent>
  readonly dialogs = inject(MatDialog);
  
  messageResult:string;
  public openDialog(enterAnimationDuration: string, exitAnimationDuration: string, message:string, dialogTitle:string): void {
    this.dialogRef =  this.dialogs.open(MessageboxOkComponent, {
     width: '550px',
     enterAnimationDuration,
     exitAnimationDuration,
     
   }); 
   this.dialogRef.componentInstance.message = message;
   this.dialogRef.componentInstance.dialogTitle = dialogTitle;
   this.dialogRef.disableClose = true;
  }
}
