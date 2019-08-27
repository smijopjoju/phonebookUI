import {Component, OnInit, Inject} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Contact} from '../contact';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-new-contact-dialog',
  templateUrl: './add-new-contact-dialog.component.html',
  styleUrls: ['./add-new-contact-dialog.component.css']
})
export class AddNewContactDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddNewContactDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Contact) { }

  ngOnInit() {
  }

  nameFormControl = new FormControl('', [
    Validators.required
  ]);

  emailFormControl = new FormControl('',[
    Validators.email
  ]);


  matcher = new MyErrorStateMatcher();

  onCancelClick(): void {
    this.dialogRef.close();
  }


  
}
