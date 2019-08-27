import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { HttpClientModule }    from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { HeaderboxComponent } from './headerbox/headerbox.component';
import { AddNewContactDialogComponent } from './add-new-contact-dialog/add-new-contact-dialog.component';
import { UpdateContactDialogComponent } from './update-contact-dialog/update-contact-dialog.component';
import { DeleteContactDialogComponent } from './delete-contact-dialog/delete-contact-dialog.component';
import { UploadContactsDialogComponent } from './upload-contacts-dialog/upload-contacts-dialog.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactsListComponent,
    HeaderboxComponent,
    AddNewContactDialogComponent,
    UpdateContactDialogComponent,
    DeleteContactDialogComponent,
    UploadContactsDialogComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatCheckboxModule,
    MatDialogModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    AddNewContactDialogComponent,
    UpdateContactDialogComponent,
    DeleteContactDialogComponent,
    UploadContactsDialogComponent
  ],
  entryComponents: [
    AddNewContactDialogComponent,
    UpdateContactDialogComponent,
    DeleteContactDialogComponent,
    UploadContactsDialogComponent
  ]
})
export class AppModule { }
