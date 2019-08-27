import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { ContactChangeEvent } from "../contact-change-event";
import { CommunicationService } from "../communication.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  contacts: Contact[] = new Array();
  constructor(private communicationService: CommunicationService) { }

  ngOnInit() {
    this.getAllContacts();
  }

  getAllContacts() {
    this.communicationService.getContacts().subscribe((data:Contact[])=>{
        this.contacts = data;
    });    
  }

  recieveEvent($event) {
    this.handleContactChangeEvent($event)
  }

  handleContactChangeEvent(event: ContactChangeEvent):void {
    switch(event.action) {
      case 'add':
              this.handleContactAddition(event.contacts);
              break;
      case 'update':
              this.handleContactUpdation(event.contacts);
              break;
      case 'delete':
              this.handleContactDeletion(event.contacts);
              break;
      default:
            break;                        
    }
  }

  handleContactAddition(newContacts: Contact[]):void {
    let tempContactsStr = JSON.stringify(this.contacts);
    let tempContacts = JSON.parse(tempContactsStr);
    newContacts.forEach(contact=>tempContacts.push(contact));
    this.contacts = tempContacts;
  }

  handleContactUpdation(updatedContacts: Contact[]): void {
    let tempContactsStr = JSON.stringify(this.contacts);
    let tempContacts = JSON.parse(tempContactsStr);
    updatedContacts.forEach(contact=>{
        for(let index = 0; index < tempContacts.length; index++) {
          if(contact.id == tempContacts[index].id) {
            tempContacts[index] = contact;
          }
        }
    });
    this.contacts = tempContacts;
  }

  handleContactDeletion(deletedContacts: Contact[]): void {
    let tempContactsStr = JSON.stringify(this.contacts);
    let tempContacts = JSON.parse(tempContactsStr);
    deletedContacts.forEach(contact=>{
      let indexToBeDeleted = 0;
      for(let index = 0; index < tempContacts.length; index++) {
        if(contact.id == tempContacts[index].id) {
          indexToBeDeleted = index;
          break;
        }
      }
      tempContacts.splice(indexToBeDeleted,indexToBeDeleted);
    });
    this.contacts = tempContacts;
  }

}
