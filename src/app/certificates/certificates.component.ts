import { Component, OnInit } from '@angular/core';
import {CertificatesService } from '../services/certificates-service/certificates.service';
import {Certificates} from '../models/certificates/certificates.model';
import { map } from 'rxjs/operators';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-certificates',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './certificates.component.html',
  styleUrl: './certificates.component.css'
})
export class CertificatesComponent implements OnInit{

  certificatesList:Certificates[] = [];
  constructor(public certificatesService: CertificatesService) {}

  ngOnInit(): void {

   this.certificatesService.getCertificates().snapshotChanges().pipe(
    map(changes =>
     changes.map(c =>
      ({ id: c.payload.doc.id, ...c.payload.doc.data() as Certificates })
     )
    )
   ).subscribe(data => {
     this.certificatesList=data;
     console.log(this.certificatesList);
   });
  }
}


