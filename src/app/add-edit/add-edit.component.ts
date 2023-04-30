import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../service/employee.service';
import { SnackbarService } from '../service/snackbar.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
})
export class AddEditComponent {
  constructor(
    private _fb: FormBuilder,
    private _employeeService: EmployeeService,
    private _snackBar: SnackbarService,

    private _dialogRef: MatDialogRef<AddEditComponent>
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
  empForm: FormGroup;

  education: string[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate',
  ];
  onFormSubmit() {
    this._employeeService.addEmployee(this.empForm.value).subscribe({
      next: (val: any) => {
        console.log(val, 'val');
        this._snackBar.openSnackBar('Employee detail updated!');
        this._dialogRef.close(true);
      },
    });
  }
}
