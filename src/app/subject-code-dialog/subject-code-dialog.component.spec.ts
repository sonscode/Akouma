import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectCodeDialogComponent } from './subject-code-dialog.component';

describe('SubjectCodeDialogComponent', () => {
  let component: SubjectCodeDialogComponent;
  let fixture: ComponentFixture<SubjectCodeDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubjectCodeDialogComponent]
    });
    fixture = TestBed.createComponent(SubjectCodeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
