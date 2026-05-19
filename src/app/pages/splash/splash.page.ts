// src/app/pages/splash/splash.page.ts
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { arrowForwardOutline } from 'ionicons/icons';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SplashPage implements OnInit {

  constructor(private router: Router) {
    // Registrar íconos usados en esta página
    addIcons({ arrowForwardOutline });
  }

  ngOnInit() {
    // ← Sin setTimeout: la navegación ocurre solo cuando el usuario presiona un botón
  }

  goToHome() {
    this.router.navigate(['/home'], { replaceUrl: true });
  }

  goToCv() {
    this.router.navigate(['/cv']);
  }
}