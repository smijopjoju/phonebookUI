import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadContactsDialogComponent } from './upload-contacts-dialog.component';

describe('UploadContactsDialogComponent', () => {
  let component: UploadContactsDialogComponent;
  let fixture: ComponentFixture<UploadContactsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadContactsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadContactsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
