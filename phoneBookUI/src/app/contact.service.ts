import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Contact } from './contact';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private contactsSource = new BehaviorSubject([{
    id: 1,
    contactName: '',
    personalNumber: '',
    officeNumber: '',
    homeNumber: '',
    emailId: ''
  }]);
  currentContact = this.contactsSource.asObservable();
  constructor(private http: HttpClient) { }

  setSelectedContacts(contacts: Contact[]) {
    this.contactsSource.next(contacts);
  }
  
}
