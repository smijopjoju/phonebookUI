import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {  FileUploader } from 'ng2-file-upload';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-upload-contacts-dialog',
  templateUrl: './upload-contacts-dialog.component.html',
  styleUrls: ['./upload-contacts-dialog.component.css']
})
export class UploadContactsDialogComponent implements OnInit {

  @ViewChild('fileInput',{static:false}) fileInput: ElementRef; 
  contactsUploadURL: string = "/contacts/upload";
  uploader: FileUploader;
  isDropOver: boolean;
  
  constructor(public dialogRef: MatDialogRef<UploadContactsDialogComponent>,
    private _snackBar: MatSnackBar){}

  ngOnInit() {
    const headers = [{name: 'Accept', value: 'application/json'}];
    this.uploader = new FileUploader({url: this.contactsUploadURL, autoUpload: true, headers: headers});
 
    this.uploader.onCompleteAll = () => {
      this.onCancelClick();
      this.openSnackBar("file uploaded","Successfully");
    };
  }

  fileOverAnother(e: any): void {
    this.isDropOver = e;
  }
 
  fileClicked() {
    this.fileInput.nativeElement.click();
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
