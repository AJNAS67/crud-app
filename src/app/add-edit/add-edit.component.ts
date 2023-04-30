import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../service/employee.service';
import { SnackbarService } from '../service/snackbar.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
})
export class AddEditComponent implements OnInit {
  constructor(
    private _fb: FormBuilder,
    private _employeeService: EmployeeService,
    private _snackBar: SnackbarService,
    private _dialogRef: MatDialogRef<AddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.empForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      package: '',
    });
  }
  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }
  empForm: FormGroup;

  education: string[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate',
  ];
  onFormSubmit() {
    if (this.data) {
      this._employeeService
        .updateEmployee(this.data.id, this.empForm.value)
        .subscribe({
          next: (value: any) => {
            this._snackBar.openSnackBar('Employee details Updated');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
    } else {
      this._employeeService.addEmployee(this.empForm.value).subscribe({
        next: (val: any) => {
          console.log(val, 'val');
          this._snackBar.openSnackBar('Employee detail updated!');
          this._dialogRef.close(true);
        },
      });
    }
  }
}
