// src/app/pages/pricing/pricing.page.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AiService } from '../../services/ai.service';

const TIPS = [
  'Compara tu precio con productos similares en el mercado local antes de decidirte.',
  'Ofrece paquetes o combos para aumentar el valor percibido sin subir el costo.',
  'Da muestras gratis al inicio para ganar clientes fieles rápidamente.',
  'Usa WhatsApp y redes sociales para promocionar sin gastar en publicidad.',
  'Mantén un registro simple de gastos y ventas en un cuaderno o en el celular.',
  'El precio justo cubre costos, paga tu tiempo y deja algo para reinvertir.',
  'No bajes el precio solo para competir; mejor mejora la calidad y el servicio.',
  'Cobra desde el primer cliente. Regalar tu trabajo desvaloriza tu esfuerzo.',
];

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.page.html',
  styleUrls: ['./pricing.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PricingPage {

  // ← Propiedades requeridas por el HTML ([(ngModel)]="...")
  producto:    string = '';
  materiales:  number | null = null;
  manoDeObra:  number | null = null;
  gastosFijos: number | null = null;
  gananciaPct: number | null = null;
  unidades:    number | null = null;

  // ← Requerido por *ngIf="resultado" y {{ resultado.xxx }}
  resultado: { costoPorUnidad: number; utilidad: number; precio: number } | null = null;

  // ← Requerido por {{ tipActual }} y (click)="nextTip()"
  tipActual: string = '';
  private tipIndex: number = 0;

  constructor(
    private router: Router,
    private aiService: AiService,
  ) {}

  // ← Requerido por (click)="calcularPrecio()"
  calcularPrecio() {
    const mat  = Number(this.materiales  ?? 0);
    const mdo  = Number(this.manoDeObra  ?? 0);
    const gf   = Number(this.gastosFijos ?? 0);
    const pct  = Number(this.gananciaPct ?? 30);
    const uds  = Math.max(1, Number(this.unidades ?? 1));

    const costoTotal     = mat + mdo + gf;
    const costoPorUnidad = costoTotal / uds;
    const utilidad       = costoPorUnidad * (pct / 100);
    const precio         = costoPorUnidad + utilidad;

    this.resultado = { costoPorUnidad, utilidad, precio };
    this.tipIndex  = Math.floor(Math.random() * TIPS.length);
    this.tipActual = TIPS[this.tipIndex];
  }

  // ← Requerido por (click)="nextTip()"
  nextTip() {
    this.tipIndex  = (this.tipIndex + 1) % TIPS.length;
    this.tipActual = TIPS[this.tipIndex];
  }
}
