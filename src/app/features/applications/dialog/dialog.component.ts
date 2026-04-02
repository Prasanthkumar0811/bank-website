import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dialog',
  imports: [CommonModule,MatButtonModule,MatIconModule,MatDialogModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {
fields = [
    { label: 'Applicant ID', key: 'applicantID'             },
    { label: 'PAN Card',     key: 'panCard'                  },
    { label: 'Employment',   key: 'employmentStatus'         },
    { label: 'Date Applied', key: 'dateApplied'              },
    { label: 'Assigned To',  key: 'assignedToBankEmployee'   },
  ];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    public ref:MatDialogRef<DialogComponent>
  ){}
}
