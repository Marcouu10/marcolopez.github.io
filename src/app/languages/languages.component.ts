import { Component, OnInit } from '@angular/core';
import {LanguagesService } from '../services/languages-service/languages.service';
import {Languages} from '../models/languages/languages.model';
import { map } from 'rxjs/operators';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-languages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './languages.component.html',
  styleUrl: './languages.component.css'
})
export class LanguagesComponent implements OnInit{

  languagesList:Languages[] = [];
  constructor(public languagesService: LanguagesService) {}

  ngOnInit(): void {

   this.languagesService.getLanguages().snapshotChanges().pipe(
    map(changes =>
     changes.map(c =>
      ({ id: c.payload.doc.id, ...c.payload.doc.data() as Languages })
     )
    )
   ).subscribe(data => {
     this.languagesList=data;
     console.log(this.languagesList);
   });
  }
}

