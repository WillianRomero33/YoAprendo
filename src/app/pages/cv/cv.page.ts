// src/app/pages/cv/cv.page.ts
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PdfService, CVData } from '../../services/pdf.service';
import { StorageService } from '../../services/storage.service';
import { AiService } from '../../services/ai.service';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.page.html',
  styleUrls: ['./cv.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CvPage implements OnInit {
  cvData: CVData = {
    nombre: '',
    telefono: '',
    correo: '',
    direccion: '',
    perfil: '',
    experiencia: '',
    educacion: '',
    habilidades: '',
    referencias: '',
  };

  profileTip: string = '';

  // ← Requerido por *ngIf="skillsList.length > 0" y *ngFor="let skill of skillsList"
  get skillsList(): string[] {
    if (!this.cvData.habilidades?.trim()) return [];
    return this.cvData.habilidades
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);
  }

  constructor(
    private router: Router,
    private pdfService: PdfService,
    private storage: StorageService,
    private aiService: AiService,
  ) {}

  async ngOnInit() {
    const saved = await this.storage.get<CVData>('cvData');
    if (saved && typeof saved === 'object') {
      this.cvData = { ...this.cvData, ...saved };
    }
    const savedTip = await this.storage.get<string>('profileTip');
    if (typeof savedTip === 'string') {
      this.profileTip = savedTip;
    }
  }

  async saveCV() {
    await this.storage.set('cvData', this.cvData);
  }

  async getProfileTip() {
    await this.saveCV();
    this.profileTip = this.aiService.improveCVProfile(
      this.cvData.nombre,
      this.cvData.perfil,
    );
    await this.storage.set('profileTip', this.profileTip);
  }

  // ← Requerido por (click)="downloadPDF()"
  downloadPDF() {
    this.saveCV();
    this.pdfService.generateCV(this.cvData);
  }

  // ← Requerido por (click)="downloadWord()"
  downloadWord() {
    this.saveCV();
    // Genera un .doc básico en formato HTML que Word puede abrir
    const content = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office"
            xmlns:w="urn:schemas-microsoft-com:office:word"
            xmlns="http://www.w3.org/TR/REC-html40">
      <head><meta charset="utf-8"><title>CV</title></head>
      <body>
        <h1>${this.cvData.nombre}</h1>
        <p>📞 ${this.cvData.telefono} | ✉ ${this.cvData.correo} | 📍 ${this.cvData.direccion}</p>
        <hr>
        <h2>Perfil Profesional</h2><p>${this.cvData.perfil}</p>
        <h2>Experiencia Laboral</h2><p>${this.cvData.experiencia}</p>
        <h2>Educación</h2><p>${this.cvData.educacion}</p>
        <h2>Habilidades</h2><p>${this.cvData.habilidades}</p>
        <h2>Referencias</h2><p>${this.cvData.referencias}</p>
        <hr><p style="font-size:10px;">Generado con YoAprendo · ImpulNova by ULS</p>
      </body></html>
    `;
    const blob = new Blob([content], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CV_${(this.cvData.nombre || 'YoAprendo').replace(/\s+/g, '_')}_ImpulNova.doc`;
    a.click();
    URL.revokeObjectURL(url);
  }
}
