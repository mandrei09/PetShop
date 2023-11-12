/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormSendModalComponent } from './formSendModal.component';

describe('FormSendModalComponent', () => {
  let component: FormSendModalComponent;
  let fixture: ComponentFixture<FormSendModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSendModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSendModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
