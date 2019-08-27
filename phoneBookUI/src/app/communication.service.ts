import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from './contact';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  contactsBaseURL: string = "/contacts";
  contactsDownloadURL: string = "/contacts/download";
  contactsUploadURL: string = "/contacts/upload";

  constructor(private http: HttpClient) { }

  getContacts() {
    return this.http.get<Contact[]>(this.contactsBaseURL);
  }

  addContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.contactsBaseURL,contact);
  }

  updateContact(contact: Contact): Observable<Contact>{
    return this.http.put<Contact>(this.contactsBaseURL,contact);
  }

  deleteContact(contact: Contact): Observable<{}> {
    let deleteURL = '${this.contactsBaseURL}/${id}'
    return this.http.delete<Contact>(deleteURL);
  }
}
