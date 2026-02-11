import { Component, OnInit } from '@angular/core';
import {SkillsService } from '../services/skills-service/skills.service';
import {Skills} from '../models/skills/skills.model';
import { map } from 'rxjs/operators';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent implements OnInit{

  skillsList:Skills[] = [];
  constructor(public skillsService: SkillsService) {}

  ngOnInit(): void {

   this.skillsService.getSkills().snapshotChanges().pipe(
    map(changes =>
     changes.map(c =>
      ({ id: c.payload.doc.id, ...c.payload.doc.data() as Skills })
     )
    )
   ).subscribe(data => {
     this.skillsList=data;
     console.log(this.skillsList);
   });
  }
}

