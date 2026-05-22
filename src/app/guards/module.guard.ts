// src/app/guards/module.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ModuleGuard implements CanActivate {
  constructor(
    private router: Router,
    private navCtrl: NavController
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // Obtener los parámetros que pasaste: moduleGuard('ikigaiAnswers','/ikigai')
    const moduleName = route.data?.['moduleName'] || 'ikigaiAnswers';
    const fallbackRoute = route.data?.['fallbackRoute'] || '/ikigai';
    
    // Aquí va tu lógica de verificación
    const hasAccess = this.checkModuleAccess(moduleName);
    
    if (!hasAccess) {
      this.navCtrl.navigateRoot(fallbackRoute);
      return false;
    }
    
    return true;
  }

  private checkModuleAccess(moduleName: string): boolean {
    // Tu lógica personalizada - ej: verificar localStorage, permisos de usuario, etc.
    const userModules = localStorage.getItem('user_modules');
    if (userModules) {
      const modules = JSON.parse(userModules);
      return modules.includes(moduleName);
    }
    return true; // O false según tu lógica
  }
}

// Función helper para usar en las rutas
export function moduleGuard(moduleName: string, fallbackRoute: string) {
  return (route: ActivatedRouteSnapshot) => {
    // Esta función se ejecuta antes de que Angular instancie el guard
    route.data = {
      ...route.data,
      moduleName,
      fallbackRoute
    };
    return ModuleGuard;
  };
}