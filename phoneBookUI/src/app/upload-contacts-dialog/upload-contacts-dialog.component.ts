import { Component, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-upload-contacts-dialog',
  templateUrl: './upload-contacts-dialog.component.html',
  styleUrls: ['./upload-contacts-dialog.component.css']
})
export class UploadContactsDialogComponent implements OnInit {

  file: string;
  constructor(public dialogRef: MatDialogRef<UploadContactsDialogComponent>) { }

  ngOnInit() {
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
