// src/app/pages/canvas/canvas.page.ts
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StorageService } from '../../services/storage.service';
import { AiService } from '../../services/ai.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.page.html',
  styleUrls: ['./canvas.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CanvasPage implements OnInit {

  activeSegment: string = 'canvas';
  canvasBlocks = [
    { emoji: '💡', title: 'Propuesta de valor',    hint: '¿Qué problema resuelves y qué te hace diferente?',              placeholder: 'Ej: Ofrezco pupusas artesanales con ingredientes orgánicos, a domicilio…' },
    { emoji: '👥', title: 'Segmento de clientes',  hint: '¿A quién va dirigido tu producto o servicio?',                  placeholder: 'Ej: Familias del municipio de 25-50 años que buscan comida casera…' },
    { emoji: '📢', title: 'Canales',               hint: '¿Cómo llegas a tus clientes?',                                  placeholder: 'Ej: WhatsApp, grupos de Facebook, mercado local, boca a boca…' },
    { emoji: '🤝', title: 'Relación con clientes', hint: '¿Cómo mantienes la relación con tus clientes?',                 placeholder: 'Ej: Atención personalizada, descuentos por fidelidad, grupos de WhatsApp…' },
    { emoji: '💰', title: 'Fuentes de ingreso',    hint: '¿Cómo ganas dinero?',                                           placeholder: 'Ej: Venta directa, pedidos por encargo, suscripciones semanales…' },
    { emoji: '🔧', title: 'Recursos clave',        hint: '¿Qué necesitas para operar tu negocio?',                        placeholder: 'Ej: Cocina, ingredientes, celular, redes sociales, mi tiempo…' },
    { emoji: '⚙️', title: 'Actividades clave',    hint: '¿Cuáles son las actividades más importantes de tu negocio?',    placeholder: 'Ej: Cocinar, entregar pedidos, publicar en redes, atender clientes…' },
    { emoji: '🌐', title: 'Socios clave',          hint: '¿Quiénes te ayudan a operar tu negocio?',                       placeholder: 'Ej: Proveedores de ingredientes, CONAMYPE, vecinos que recomiendan…' },
    { emoji: '📊', title: 'Estructura de costos',  hint: '¿Cuáles son tus principales gastos?',                           placeholder: 'Ej: Ingredientes, gas, transporte, empaques, publicidad…' },
  ];

  canvasData: string[] = Array(9).fill('');

  canvasResult: string = '';

  constructor(
    private router: Router,
    private storage: StorageService,
    private aiService: AiService,
  ) {}

  async ngOnInit() {
    const savedData = await this.storage.get<string[]>('canvasData');
    if (Array.isArray(savedData) && savedData.length === this.canvasBlocks.length) {
      this.canvasData = savedData;
    }
    const savedResult = await this.storage.get<string>('canvasResult');
    if (typeof savedResult === 'string') {
      this.canvasResult = savedResult;
    }
  }

  // ← Requerido por (ionChange)="onSegmentChange($event)"
  onSegmentChange(event: any) {
    this.activeSegment = event.detail.value;
  }

  async saveCanvas() {
    await this.storage.set('canvasData', this.canvasData);
  }

  async analyzeCanvas() {
    await this.saveCanvas();
    const fields = this.canvasBlocks.map((block, i) => ({
      label: block.title,
      value: this.canvasData[i] || '',
    }));
    this.canvasResult = this.aiService.analyzeCanvas(fields);
    await this.storage.set('canvasResult', this.canvasResult);
  }

  goToCV() {
    this.router.navigate(['/cv']);
  }
}
