import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { LiveService } from 'src/app/shared/service/live.service';

@Component({
  selector: 'app-form-live-dialog',
  templateUrl: './form-live-dialog.component.html',
  styleUrls: ['./form-live-dialog.component.css']
})
export class FormLiveDialogComponent implements OnInit {
  public liveForm: FormGroup;

  constructor(
    private service: LiveService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<FormLiveDialogComponent>
  ) { }

  ngOnInit(): void {
    this.liveForm = this.fb.group({
      liveName: ['', [Validators.required]],
      channelName: ['', [Validators.required]],
      liveLink: ['', [Validators.required]],
      liveDate: ['', [Validators.required]]
//      registrationDate: ['', [Validators.required]],
    })
  }

  createLive(): void {
    this.service.postLive(this.liveForm.value).subscribe(result => {});
    this.dialogRef.close();
    this.liveForm.reset();
  }

  cancel(): void {
    this.dialogRef.close();
    this.liveForm.reset();
  }

}
