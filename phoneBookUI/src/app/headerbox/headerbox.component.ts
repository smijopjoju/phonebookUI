import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AddNewContactDialogComponent } from "../add-new-contact-dialog/add-new-contact-dialog.component";
import { UpdateContactDialogComponent } from '../update-contact-dialog/update-contact-dialog.component';
import { DeleteContactDialogComponent } from '../delete-contact-dialog/delete-contact-dialog.component';
import { UploadContactsDialogComponent } from '../upload-contacts-dialog/upload-contacts-dialog.component';
import { ContactService } from "../contact.service";
import { Contact } from "../contact";
import {MatSnackBar} from '@angular/material/snack-bar';
import { ContactChangeEvent } from "../contact-change-event";
import { CommunicationService } from "../communication.service"

@Component({
  selector: 'app-headerbox',
  templateUrl: './headerbox.component.html',
  styleUrls: ['./headerbox.component.css']
})
export class HeaderboxComponent implements OnInit {

  currentlySelectedContacts: Contact[];
  @Output() contactsChangeEvent:EventEmitter<ContactChangeEvent> = new EventEmitter();

  constructor(
    public dialog: MatDialog,
    private contactsSharedService: ContactService,
    private _snackBar: MatSnackBar,
    private communicationService: CommunicationService) { }

  ngOnInit() {
    this.getLatestStatus();
  }

  getLatestStatus() {
    this.contactsSharedService.currentContact.subscribe(contacts=>this.currentlySelectedContacts = contacts);
  }

  openAddNewContactDialog(): void{

      const dialogRef = this.dialog.open(AddNewContactDialogComponent, {
        width: '400px',
        data: {
          id:0,
          contactName: '',
          emailId: '',
          homeNumber: '',
          officeNumber: '',
          personalNumber: ''
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if(this.isValidContact(result)) {
          this.communicationService.addContact(result).subscribe(contact=>{
            let changeMessage = {action:'add',contacts:[contact]};
            this.emitContactChangeEvent(changeMessage);
          });          
        }
      });

  }

  openUpdateContactDialog(): void {
    if(this.isValidToPermitTheOperation()) {
      let dataStr = JSON.stringify(this.currentlySelectedContacts[0]);
      const dialogRef = this.dialog.open(UpdateContactDialogComponent, {
        width: '400px',
        data: JSON.parse(dataStr)
      });

      dialogRef.afterClosed().subscribe(result => {
        if(this.isValidContact(result)) {
          this.communicationService.updateContact(result).subscribe(contact=>{
            let changeMessage = {action:'update',contacts:[contact]};
            this.emitContactChangeEvent(changeMessage);
          });           
        }
      });
    }
  }

  openDeleteContactDialog(): void {
    if(this.isValidToPermitTheOperation()) {
      let dataStr = JSON.stringify(this.currentlySelectedContacts[0]);
      const dialogRef = this.dialog.open(DeleteContactDialogComponent, {
        width: '300px',
        data: JSON.parse(dataStr)
      });

      dialogRef.afterClosed().subscribe(result => {
        if(this.isValidContact(result)) {
          this.communicationService.deleteContact(result).subscribe(contact=>{
            let changeMessage = {action:'delete',contacts:[result]};
            this.emitContactChangeEvent(changeMessage);
          });          
        }
      });
    }
  }

  openUploadContactsDialog(): void {
    const dialogRef = this.dialog.open(UploadContactsDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  isValidToPermitTheOperation():boolean {
    this.getLatestStatus();
    if(this.currentlySelectedContacts != null && this.currentlySelectedContacts.length == 1 &&
      this.isValidContact(this.currentlySelectedContacts[0])) {
      return true;
    }  else {
      this.openSnackBar("Select contact","Only one contact");
    }
    return false;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  downloadContacts(): void {
    if(this.isValidToDownload()) {

    }
  }

  isValidToDownload(): boolean {
    this.getLatestStatus();
    if(this.currentlySelectedContacts != null && this.currentlySelectedContacts.length > 0) {
      return true;
    }
    this.openSnackBar("Select contact","Atleast one contact");
    return false;
  }

  isValidContact(contact: Contact): boolean {
    if(contact != null && contact.contactName != null) {
      return true;
    }
    return false;
  }

  emitContactChangeEvent(message: ContactChangeEvent): void {
    this.contactsChangeEvent.emit(message);
  }
}
