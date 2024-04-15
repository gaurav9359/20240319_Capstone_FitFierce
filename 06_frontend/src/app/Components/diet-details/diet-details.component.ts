import { Component,Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { MatTableDataSource } from '@angular/material/table';
import { MatTable } from '@angular/material/table';



@Component({
  selector: 'app-diet-details',
  standalone: true,
  imports: [CommonModule,MatButton,MatTable],
  templateUrl: './diet-details.component.html',
  styleUrl: './diet-details.component.css'
})
export class DietDetailsComponent {
  dietData!:any
  constructor(
    public dialogRef: MatDialogRef<DietDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){
      console.log("dara",data.dietDetails)
      this.dietData= data.dietDetails
    }
    
    handleClose(){
      this.dialogRef.close("closed Successfully")
    }


}
