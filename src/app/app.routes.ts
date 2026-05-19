// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'splash', pathMatch: 'full' },
  {
    path: 'splash',
    loadComponent: () => import('./pages/splash/splash.page').then(m => m.SplashPage),
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage),
  },
  {
    path: 'ikigai',
    loadComponent: () => import('./pages/ikigai/ikigai.page').then(m => m.IkigaiPage),
  },
  {
    path: 'tutorials',
    loadComponent: () => import('./pages/tutorials/tutorials.page').then(m => m.TutorialsPage),
  },
  {
    path: 'video-detail/:id',
    loadComponent: () => import('./pages/video-detail/video-detail.page').then(m => m.VideoDetailPage),
  },
  {
    path: 'pricing',
    loadComponent: () => import('./pages/pricing/pricing.page').then(m => m.PricingPage),
  },
  {
    path: 'canvas',
    loadComponent: () => import('./pages/canvas/canvas.page').then(m => m.CanvasPage),
  },
  {
    path: 'institutions',
    loadComponent: () => import('./pages/institutions/institutions.page').then(m => m.InstitutionsPage),
  },
  {
    path: 'cv',
    loadComponent: () => import('./pages/cv/cv.page').then(m => m.CvPage),
  },
  // ← Ruta comodín: cualquier URL inválida redirige a home (evita pantalla en blanco)
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];