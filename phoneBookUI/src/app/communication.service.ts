import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Contact } from './contact';
import { Observable } from 'rxjs';
import * as fileSaver from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  contactsBaseURL: string = "/contacts";
  contactsDownloadURL: string = "/contacts/download";

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
    let deleteURL = this.contactsBaseURL+'/'+contact.id;
    return this.http.delete<Contact>(deleteURL);
  }

  downloadContacts():void {
      let headers = new HttpHeaders();
      headers = headers.append('Accept', 'text/csv; charset=utf-8');
      this.http.get(this.contactsDownloadURL,{
        headers: headers,
        observe: 'response',
        responseType: 'text'
      }).subscribe(data=>{
        this.saveFile(data);
      });
  }

  saveFile(data:any): void {
    const blob = new Blob([data.body], {type: 'text/csv; charset=utf-8'});
    fileSaver.saveAs(blob,"contacts.csv");
  }
}
