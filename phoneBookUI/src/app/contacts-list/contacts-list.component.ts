import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';
import { Contact } from "../contact";
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { ContactService } from "../contact.service";

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit,OnChanges {

  constructor(private contactsSharedService: ContactService) { }

  @Input() contacts: Contact[];
  currentlySelectedContacts: Contact[] = new Array();

  displayedColumns: string[] = ['select','contactName', 'personalNumber', 'officeNumber', 'homeNumber','emailId'];
  dataSource = new MatTableDataSource<Contact>(this.contacts);

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Contact>(this.contacts);
  }

  ngOnChanges(changes: {[propKey:string]: SimpleChange}) {
    console.log("onChange: "+changes);
    for (let propName in changes) {
      let changedProp = changes[propName];
      this.contacts = changedProp.currentValue;
      this.dataSource.data = this.contacts;
    }
  }
  
  selection = new SelectionModel<Contact>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if(this.isAllSelected()) {
      this.selection.clear();
      this.currentlySelectedContacts = new Array();
      this.contactsSharedService.setSelectedContacts(this.currentlySelectedContacts);
    } else {
      this.dataSource.data.forEach(row => {
        this.selection.select(row);
        this.currentlySelectedContacts.push(row);
      });
      this.contactsSharedService.setSelectedContacts(this.currentlySelectedContacts);
    }
    
  }

  checkboxLabel(row?: Contact): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    this.currentlySelectedContacts = this.selection.selected;
    this.contactsSharedService.setSelectedContacts(this.currentlySelectedContacts);
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
}
