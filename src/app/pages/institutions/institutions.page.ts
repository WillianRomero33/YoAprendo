// src/app/pages/institutions/institutions.page.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-institutions',
  templateUrl: './institutions.page.html',
  styleUrls: ['./institutions.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class InstitutionsPage {
  institutions = [
    { name: 'CONAMYPE',              icon: '🏢', description: 'Comisión Nacional de la Micro y Pequeña Empresa',  services: 'Capacitación, asistencia técnica y acceso a mercados', color: 'success'  },
    { name: 'BANDESAL',              icon: '🏦', description: 'Banco de Desarrollo de El Salvador',               services: 'Créditos para micro y pequeños emprendedores',          color: 'warning'  },
    { name: 'BMI',                   icon: '💳', description: 'Banco Multisectorial de Inversiones',              services: 'Financiamiento para proyectos productivos',             color: 'tertiary' },
    { name: 'INSAFORP',              icon: '🎓', description: 'Instituto Salvadoreño de Formación Profesional',   services: 'Cursos técnicos gratuitos',                            color: 'danger'   },
    { name: 'Universidad Luterana',  icon: '🎓', description: 'Universidad Luterana Salvadoreña',                 services: 'Proyecto ImpulNova - Asesoría y formación',            color: 'warning'  },
  ];
}
