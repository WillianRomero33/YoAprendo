// src/app/pages/home/home.page.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class HomePage implements OnInit {
  userProgress = 20;

  modules = [
    { id: 'ikigai',       icon: '🧭', title: 'Módulo I · Ikigai',        subtitle: 'Descubre tu propósito emprendedor',       pill: 'Activo',   pillClass: 'pill-green', featured: false },
    { id: 'tutorials',    icon: '🎬', title: 'Módulo II · Tutoriales',    subtitle: 'Agroecología, carpintería, gastronomía…', pill: 'Activo',   pillClass: 'pill-green', featured: false },
    { id: 'pricing',      icon: '💰', title: 'Módulo III · Precios',      subtitle: 'Calcula el precio justo de tu producto',  pill: 'Activo',   pillClass: 'pill-green', featured: false },
    { id: 'canvas',       icon: '📋', title: 'Módulo IV · Canvas & CV',   subtitle: 'Plan de negocio y currículum',            pill: 'Activo',   pillClass: 'pill-green', featured: false },
    { id: 'institutions', icon: '🏛️', title: 'Módulo V · Instituciones', subtitle: 'CONAMYPE, BANDESAL, BMI y más',           pill: 'Activo',   pillClass: 'pill-green', featured: false },
    { id: 'cv',           icon: '📄', title: 'Generador de CV',           subtitle: 'Descarga tu hoja de vida en PDF o Word',  pill: 'Nuevo ✦', pillClass: 'pill-gold',  featured: true  },
  ];

  constructor(
    private router: Router,
    private storage: StorageService,
  ) {}

  async ngOnInit() {
    const savedProgress = await this.storage.get<number>('userProgress');
    if (savedProgress !== null && savedProgress !== undefined) {
      this.userProgress = savedProgress;
    }
  }

  navigateTo(page: string) {
    this.router.navigate([`/${page}`]);
  }
}