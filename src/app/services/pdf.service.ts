import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';

export interface CVData {
  nombre: string;
  telefono: string;
  correo: string;
  direccion: string;
  perfil: string;
  experiencia: string;
  educacion: string;
  habilidades: string;
  referencias: string;
}

@Injectable({ providedIn: 'root' })
export class PdfService {

  // ── Colores del diseño ───────────────────────────────────────────────────────
  private readonly C = {
    navy:    [11, 17, 32]    as [number, number, number],
    gold:    [245, 166, 35]  as [number, number, number],
    orange:  [232, 99, 26]   as [number, number, number],
    surface: [22, 31, 53]    as [number, number, number],
    white:   [255, 255, 255] as [number, number, number],
    text:    [30, 40, 60]    as [number, number, number],
    muted:   [90, 105, 135]  as [number, number, number],
    accent:  [15, 196, 164]  as [number, number, number],
  };

  // ── Dimensiones carta ────────────────────────────────────────────────────────
  private readonly W = 215.9; // mm
  private readonly H = 279.4; // mm
  private readonly ML = 0;    // margen izquierdo columna izq
  private readonly COL1 = 62; // ancho columna izquierda
  private readonly COL2_X = 68; // inicio columna derecha
  private readonly COL2_W = 215.9 - 68 - 8; // ancho columna derecha

  generateCV(data: CVData): void {
    const doc = new jsPDF({ unit: 'mm', format: 'letter', orientation: 'portrait' });

    this.drawBackground(doc);
    this.drawLeftColumn(doc, data);
    this.drawRightColumn(doc, data);
    this.drawFooter(doc);

    const filename = `CV_${(data.nombre || 'YoAprendo').replace(/\s+/g, '_')}_ImpulNova.pdf`;
    doc.save(filename);
  }

  // ── FONDO ────────────────────────────────────────────────────────────────────
  private drawBackground(doc: jsPDF): void {
    // Columna izquierda oscura
    doc.setFillColor(...this.C.navy);
    doc.rect(0, 0, this.COL1, this.H, 'F');

    // Columna derecha blanca
    doc.setFillColor(250, 251, 255);
    doc.rect(this.COL1, 0, this.W - this.COL1, this.H, 'F');

    // Separador dorado
    doc.setFillColor(...this.C.gold);
    doc.rect(this.COL1, 0, 2, this.H, 'F');

    // Acento decorativo superior izquierdo
    doc.setFillColor(...this.C.orange);
    doc.rect(0, 0, this.COL1, 4, 'F');

    // Acento decorativo inferior izquierdo
    doc.setFillColor(...this.C.gold);
    doc.rect(0, this.H - 4, this.COL1, 4, 'F');
  }

  // ── COLUMNA IZQUIERDA ────────────────────────────────────────────────────────
  private drawLeftColumn(doc: jsPDF, data: CVData): void {
    let y = 18;
    const x = 5;
    const w = this.COL1 - 10;

    // Avatar circular (iniciales)
    const initials = this.getInitials(data.nombre);
    doc.setFillColor(...this.C.gold);
    doc.circle(this.COL1 / 2, y + 14, 14, 'F');
    doc.setTextColor(...this.C.navy);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(initials, this.COL1 / 2, y + 18, { align: 'center' });
    y += 34;

    // Nombre (dividido en líneas para columna estrecha)
    doc.setTextColor(...this.C.white);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    const nameLines = doc.splitTextToSize(data.nombre || 'Tu Nombre', w);
    doc.text(nameLines, this.COL1 / 2, y, { align: 'center' });
    y += nameLines.length * 5 + 4;

    // Tag ImpulNova
    doc.setFontSize(6.5);
    doc.setTextColor(...this.C.gold);
    doc.text('ImpulNova · ULS · 2026', this.COL1 / 2, y, { align: 'center' });
    y += 10;

    // Línea separadora
    doc.setDrawColor(...this.C.gold);
    doc.setLineWidth(0.3);
    doc.line(x, y, x + w, y);
    y += 6;

    // ── CONTACTO
    this.leftSectionTitle(doc, '● CONTACTO', x, y);
    y += 6;

    if (data.telefono) {
      y = this.leftItem(doc, '📞', data.telefono, x, y, w);
    }
    if (data.correo) {
      y = this.leftItem(doc, '✉', data.correo, x, y, w);
    }
    if (data.direccion) {
      y = this.leftItem(doc, '📍', data.direccion, x, y, w);
    }
    y += 4;

    // ── HABILIDADES
    if (data.habilidades) {
      this.leftSectionTitle(doc, '● HABILIDADES', x, y);
      y += 6;
      const skills = data.habilidades.split(',').map(s => s.trim()).filter(Boolean);
      skills.forEach(skill => {
        if (y > this.H - 20) return;
        // Pill de habilidad
        const pillW = Math.min(w, doc.getTextWidth(skill) + 6);
        doc.setFillColor(...this.C.surface);
        doc.roundedRect(x, y - 3.5, pillW, 6, 1.5, 1.5, 'F');
        doc.setTextColor(...this.C.gold);
        doc.setFontSize(7);
        doc.setFont('helvetica', 'normal');
        doc.text(skill, x + 3, y + 0.5);
        y += 8;
      });
      y += 2;
    }

    // ── REFERENCIAS
    if (data.referencias) {
      this.leftSectionTitle(doc, '● REFERENCIAS', x, y);
      y += 6;
      doc.setTextColor(180, 190, 210);
      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'normal');
      const refLines = doc.splitTextToSize(data.referencias, w);
      refLines.forEach((line: string) => {
        if (y > this.H - 16) return;
        doc.text(line, x, y);
        y += 4.5;
      });
    }
  }

  private leftSectionTitle(doc: jsPDF, title: string, x: number, y: number): void {
    doc.setTextColor(...this.C.gold);
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'bold');
    doc.text(title, x, y);
  }

  private leftItem(doc: jsPDF, icon: string, text: string, x: number, y: number, w: number): number {
    doc.setTextColor(180, 190, 210);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    const lines = doc.splitTextToSize(`${icon} ${text}`, w);
    lines.forEach((line: string) => {
      doc.text(line, x, y);
      y += 4.2;
    });
    return y + 1;
  }

  // ── COLUMNA DERECHA ──────────────────────────────────────────────────────────
  private drawRightColumn(doc: jsPDF, data: CVData): void {
    const x = this.COL2_X;
    const w = this.COL2_W;
    let y = 14;

    // Nombre grande
    doc.setTextColor(...this.C.navy);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    const nomLines = doc.splitTextToSize(data.nombre || 'Tu Nombre', w);
    doc.text(nomLines, x, y);
    y += nomLines.length * 7 + 1;

    // Subtítulo
    doc.setTextColor(...this.C.muted);
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'normal');
    doc.text('Emprendedor/a · YoAprendo · ImpulNova ULS', x, y);
    y += 5;

    // Línea dorada decorativa
    doc.setFillColor(...this.C.gold);
    doc.rect(x, y, 30, 1.5, 'F');
    doc.setFillColor(...this.C.orange);
    doc.rect(x + 32, y, 10, 1.5, 'F');
    y += 7;

    // ── PERFIL PROFESIONAL
    if (data.perfil) {
      y = this.rightSection(doc, 'PERFIL PROFESIONAL', data.perfil, x, y, w);
    }

    // ── EXPERIENCIA
    if (data.experiencia) {
      y = this.rightSection(doc, 'EXPERIENCIA LABORAL', data.experiencia, x, y, w);
    }

    // ── EDUCACIÓN
    if (data.educacion) {
      y = this.rightSection(doc, 'EDUCACIÓN', data.educacion, x, y, w);
    }
  }

  private rightSection(doc: jsPDF, title: string, content: string, x: number, y: number, w: number): number {
    if (y > this.H - 20) return y;

    // Título de sección con borde izquierdo dorado
    doc.setFillColor(...this.C.gold);
    doc.rect(x - 3, y - 3.5, 1.5, 7, 'F');

    doc.setTextColor(...this.C.navy);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text(title, x, y);
    y += 5;

    // Línea sutil
    doc.setDrawColor(220, 225, 240);
    doc.setLineWidth(0.2);
    doc.line(x, y - 1, x + w, y - 1);
    y += 2;

    // Contenido
    doc.setTextColor(...this.C.text);
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'normal');
    const lines = doc.splitTextToSize(content, w);
    lines.forEach((line: string) => {
      if (y > this.H - 14) return;
      doc.text(line, x, y);
      y += 4.8;
    });

    return y + 5;
  }

  // ── PIE DE PÁGINA ────────────────────────────────────────────────────────────
  private drawFooter(doc: jsPDF): void {
    // Barra dorada inferior en columna derecha
    doc.setFillColor(...this.C.gold);
    doc.rect(this.COL1 + 2, this.H - 8, this.W - this.COL1 - 2, 8, 'F');

    doc.setTextColor(...this.C.navy);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    doc.text(
      'Generado con YoAprendo · ImpulNova by ULS · Universidad Luterana Salvadoreña',
      this.COL1 + 6,
      this.H - 3.5,
    );
  }

  // ── Utilidades ───────────────────────────────────────────────────────────────
  private getInitials(name: string): string {
    if (!name) return 'YA';
    const parts = name.trim().split(' ').filter(Boolean);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.slice(0, 2).toUpperCase();
  }
}
