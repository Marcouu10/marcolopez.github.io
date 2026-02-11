import { Component, OnInit } from '@angular/core';
import {EducationService } from '../services/education-service/education.service';
import {Education} from '../models/education/education.model';
import { map } from 'rxjs/operators';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './education.component.html',
  styleUrl: './education.component.css'
})
export class EducationComponent implements OnInit{

  educationList:Education[] = [];
  constructor(public educationService: EducationService) {}
  
  ngOnInit(): void {
  
   this.educationService.getEducation().snapshotChanges().pipe(
    map(changes =>
     changes.map(c =>
      ({ id: c.payload.doc.id, ...c.payload.doc.data() as Education })
     )
    )
   ).subscribe(data => {
     this.educationList=data;
     console.log(this.educationList);
   });
  }
}
