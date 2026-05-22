// src/app/services/pdf.service.ts
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


interface Zone { y0: number; y1: number; }

@Injectable({ providedIn: 'root' })
export class PdfService {

  private readonly C = {
    navy:    [11,  17,  32 ] as [number, number, number],
    gold:    [245, 166, 35 ] as [number, number, number],
    orange:  [232, 99,  26 ] as [number, number, number],
    surface: [22,  31,  53 ] as [number, number, number],
    white:   [255, 255, 255] as [number, number, number],
    text:    [30,  40,  60 ] as [number, number, number],
    muted:   [90,  105, 135] as [number, number, number],
    lightBg: [250, 251, 255] as [number, number, number],
    sideTxt: [180, 190, 210] as [number, number, number],
    lineDiv: [210, 215, 235] as [number, number, number],
  };

  // ── Medidas página carta ─────────────────────────────────────────────────────
  private readonly W  = 215.9;
  private readonly H  = 279.4;

  // ── Columna izquierda ────────────────────────────────────────────────────────
  private readonly LC_W  = 62;   // ancho
  private readonly LC_X  = 5;    // margen interior izq
  private readonly LC_IW = 52;   // ancho interior (LC_W - 2*LC_X)

  // ── Columna derecha ──────────────────────────────────────────────────────────
  private readonly RC_X  = 68;
  private readonly RC_W  = 215.9 - 68 - 8;

  // ── Zonas fijas de la columna izquierda (y0..y1 en mm) ──────────────────────
  // Dividen la altura útil (14..269) en bloques proporcionales
  private readonly Z_AVATAR:   Zone = { y0: 14,  y1: 80  }; // avatar + nombre + tag
  private readonly Z_CONTACT:  Zone = { y0: 82,  y1: 125 }; // contacto
  private readonly Z_SKILLS:   Zone = { y0: 127, y1: 200 }; // habilidades
  private readonly Z_REFS:     Zone = { y0: 202, y1: 258 }; // referencias

  // ── Zonas fijas de la columna derecha ────────────────────────────────────────
  private readonly Z_HEADER:   Zone = { y0: 14,  y1: 42  }; // nombre + subtítulo
  private readonly Z_PERFIL:   Zone = { y0: 44,  y1: 112 }; // perfil profesional
  private readonly Z_EXP:      Zone = { y0: 114, y1: 200 }; // experiencia
  private readonly Z_EDU:      Zone = { y0: 202, y1: 258 }; // educación

  private readonly FOOTER_Y = 262; // inicio del footer

  // ── Helpers ──────────────────────────────────────────────────────────────────
  private fitFontSize(
    doc: jsPDF, text: string, maxW: number,
    zoneH: number, minFs: number, maxFs: number, style: string = 'normal'
  ): { fontSize: number; lineH: number; lines: string[] } {
    for (let fs = maxFs; fs >= minFs; fs -= 0.5) {
      doc.setFontSize(fs);
      doc.setFont('helvetica', style);
      const lines = doc.splitTextToSize(text, maxW);
      const lineH = fs * 0.42;
      const totalH = lines.length * lineH;
      if (totalH <= zoneH) {
        return { fontSize: fs, lineH, lines };
      }
    }
  
    doc.setFontSize(minFs);
    doc.setFont('helvetica', style);
    const lines = doc.splitTextToSize(text, maxW);
    return { fontSize: minFs, lineH: minFs * 0.42, lines };
  }

  /** Centra texto verticalmente dentro de una zona */
  private centerY(zone: Zone, contentH: number): number {
    return zone.y0 + (zone.y1 - zone.y0 - contentH) / 2;
  }

  // ── ENTRY POINT ──────────────────────────────────────────────────────────────
  generateCV(data: CVData): void {
    const doc = new jsPDF({ unit: 'mm', format: 'letter', orientation: 'portrait' });
    this.drawBackground(doc);
    this.drawLeftColumn(doc, data);
    this.drawRightColumn(doc, data);
    this.drawFooter(doc);
    doc.save(`CV_${(data.nombre || 'YoAprendo').replace(/\s+/g, '_')}_ImpulNova.pdf`);
  }

  // ── FONDO ────────────────────────────────────────────────────────────────────
  private drawBackground(doc: jsPDF): void {
    doc.setFillColor(...this.C.navy);
    doc.rect(0, 0, this.LC_W, this.H, 'F');
    doc.setFillColor(...this.C.lightBg);
    doc.rect(this.LC_W, 0, this.W - this.LC_W, this.H, 'F');
    // Separador dorado
    doc.setFillColor(...this.C.gold);
    doc.rect(this.LC_W, 0, 2, this.H, 'F');
    // Acento superior
    doc.setFillColor(...this.C.orange);
    doc.rect(0, 0, this.LC_W, 4, 'F');
    // Acento inferior
    doc.setFillColor(...this.C.gold);
    doc.rect(0, this.H - 4, this.LC_W, 4, 'F');
    // Divisores sutiles entre zonas izquierda
    doc.setDrawColor(255, 255, 255, 0.08 as any);
    doc.setLineWidth(0.15);
    [this.Z_CONTACT.y0 - 1, this.Z_SKILLS.y0 - 1, this.Z_REFS.y0 - 1].forEach(yy => {
      doc.line(this.LC_X, yy, this.LC_X + this.LC_IW, yy);
    });
  }

  // ── COLUMNA IZQUIERDA ────────────────────────────────────────────────────────
  private drawLeftColumn(doc: jsPDF, data: CVData): void {

    // ── ZONA AVATAR ─────────────────────────────────────────────────────────────
    {
      const z = this.Z_AVATAR;
      const midX = this.LC_W / 2;
      const avatarY = z.y0 + 2;
      const r = 13;

      doc.setFillColor(...this.C.gold);
      doc.circle(midX, avatarY + r, r, 'F');
      doc.setTextColor(...this.C.navy);
      doc.setFontSize(13); doc.setFont('helvetica', 'bold');
      doc.text(this.getInitials(data.nombre), midX, avatarY + r + 4.5, { align: 'center' });

      // Nombre
      let nameY = avatarY + r * 2 + 6;
      doc.setTextColor(...this.C.white);
      doc.setFontSize(9); doc.setFont('helvetica', 'bold');
      const nameW = this.LC_IW;
      const nameLines = doc.splitTextToSize(data.nombre || 'Tu Nombre', nameW);
      nameLines.forEach((l: string) => {
        doc.text(l, midX, nameY, { align: 'center' });
        nameY += 4.8;
      });

      // Tag
      doc.setFontSize(5.5); doc.setTextColor(...this.C.gold);
      doc.text('ImpulNova  ULS  2026', midX, nameY + 2, { align: 'center' });

      // Separador
      doc.setDrawColor(...this.C.gold); doc.setLineWidth(0.3);
      doc.line(this.LC_X, z.y1 - 2, this.LC_X + this.LC_IW, z.y1 - 2);
    }

    // ── ZONA CONTACTO ────────────────────────────────────────────────────────────
    {
      const z = this.Z_CONTACT;
      const items: { label: string; value: string }[] = [];
      if (data.telefono)  items.push({ label: 'Tel',   value: data.telefono  });
      if (data.correo)    items.push({ label: 'Email', value: data.correo    });
      if (data.direccion) items.push({ label: 'Dir',   value: data.direccion });

      if (items.length > 0) {
        const zoneH = z.y1 - z.y0;
        const itemH = (zoneH - 8) / items.length;

        let y = z.y0 + 4;
        this.leftZoneTitle(doc, 'CONTACTO', this.LC_X, y);
        y += 6;

        items.forEach(item => {
          const { fontSize, lineH, lines } = this.fitFontSize(
            doc, item.value, this.LC_IW, itemH - 5, 6, 8
          );
          doc.setFontSize(Math.min(fontSize, 7));
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(...this.C.gold);
          doc.text(item.label + ':', this.LC_X, y);

          doc.setFont('helvetica', 'normal');
          doc.setTextColor(...this.C.sideTxt);
          const linesActual = doc.splitTextToSize(item.value, this.LC_IW);
          linesActual.forEach((l: string, idx: number) => {
            if (idx === 0) {
              doc.text(l, this.LC_X + doc.getTextWidth(item.label + ':') + 1.5, y);
            } else {
              y += lineH;
              doc.text(l, this.LC_X, y);
            }
          });
          y += itemH;
        });
      }
    }

    // ── ZONA HABILIDADES ─────────────────────────────────────────────────────────
    {
      const z = this.Z_SKILLS;
      const skills = (data.habilidades || '')
        .split(',').map(s => s.trim()).filter(Boolean);

      if (skills.length > 0) {
        const zoneH = z.y1 - z.y0;
        let y = z.y0 + 4;
        this.leftZoneTitle(doc, 'HABILIDADES', this.LC_X, y);
        y += 6;


        const pillAreaH = zoneH - 10;
        const pillH   = Math.min(8, Math.max(5, pillAreaH / skills.length));
        const fontSize = Math.min(7.5, Math.max(5.5, pillH * 0.8));
        const gap      = Math.min(2, (pillAreaH - skills.length * pillH) / Math.max(skills.length - 1, 1));

        skills.forEach(skill => {
          if (y + pillH > z.y1) return;
          const pillW = Math.min(this.LC_IW, doc.getTextWidth(skill) + 8);
          doc.setFillColor(...this.C.surface);
          doc.roundedRect(this.LC_X, y - pillH * 0.6, pillW, pillH, 1.5, 1.5, 'F');
          doc.setTextColor(...this.C.gold);
          doc.setFontSize(fontSize); doc.setFont('helvetica', 'normal');
          doc.text(skill, this.LC_X + 3, y);
          y += pillH + gap;
        });
      }
    }

    // ── ZONA REFERENCIAS ─────────────────────────────────────────────────────────
    {
      const z = this.Z_REFS;
      if (data.referencias?.trim()) {
        const zoneH = z.y1 - z.y0;
        let y = z.y0 + 4;
        this.leftZoneTitle(doc, 'REFERENCIAS', this.LC_X, y);
        y += 6;

        const { fontSize, lineH, lines } = this.fitFontSize(
          doc, data.referencias, this.LC_IW, zoneH - 10, 6, 8
        );
        doc.setFontSize(fontSize); doc.setFont('helvetica', 'normal');
        doc.setTextColor(...this.C.sideTxt);
        lines.forEach((l: string) => {
          if (y > z.y1) return;
          doc.text(l, this.LC_X, y);
          y += lineH;
        });
      } else {
        let y = this.centerY(z, 8);
        doc.setFontSize(6.5); doc.setFont('helvetica', 'normal');
        doc.setTextColor(60, 75, 100);
        doc.text('Disponibles al solicitarlas', this.LC_W / 2, y, { align: 'center' });
      }
    }
  }

  private leftZoneTitle(doc: jsPDF, title: string, x: number, y: number): void {
    doc.setFontSize(7); doc.setFont('helvetica', 'bold');
    doc.setTextColor(...this.C.gold);
    doc.text(title, x, y);
  }

  // ── COLUMNA DERECHA ──────────────────────────────────────────────────────────
  private drawRightColumn(doc: jsPDF, data: CVData): void {

    // ── ZONA HEADER ──────────────────────────────────────────────────────────────
    {
      const z = this.Z_HEADER;
      let y = z.y0;

      // Nombre — fuente adaptativa
      doc.setFont('helvetica', 'bold');
      const nameLines = doc.splitTextToSize(data.nombre || 'Tu Nombre', this.RC_W);
      const nameFsMax = nameLines.length === 1 ? 22 : 17;
      doc.setFontSize(nameFsMax);
      doc.setTextColor(...this.C.navy);
      doc.text(doc.splitTextToSize(data.nombre || 'Tu Nombre', this.RC_W), this.RC_X, y);
      y += nameLines.length * (nameFsMax * 0.42) + 2;

      // Subtítulo
      doc.setFontSize(7.5); doc.setFont('helvetica', 'normal');
      doc.setTextColor(...this.C.muted);
      doc.text('Emprendedor/a  |  YoAprendo  |  ImpulNova ULS', this.RC_X, y);
      y += 5;

      // Línea decorativa
      doc.setFillColor(...this.C.gold);
      doc.rect(this.RC_X, y, 28, 1.5, 'F');
      doc.setFillColor(...this.C.orange);
      doc.rect(this.RC_X + 30, y, 10, 1.5, 'F');
    }

    // ── ZONA PERFIL ───────────────────────────────────────────────────────────────
    if (data.perfil?.trim()) {
      this.rightZone(doc, 'PERFIL PROFESIONAL', data.perfil, this.Z_PERFIL);
    }

    // ── ZONA EXPERIENCIA ─────────────────────────────────────────────────────────
    if (data.experiencia?.trim()) {
      this.rightZone(doc, 'EXPERIENCIA LABORAL', data.experiencia, this.Z_EXP);
    }

    // ── ZONA EDUCACION ────────────────────────────────────────────────────────────
    if (data.educacion?.trim()) {
      this.rightZone(doc, 'EDUCACION', data.educacion, this.Z_EDU);
    }
  }

  /** Dibuja una sección derecha dentro de una zona fija, adaptando fuente y espaciado */
  private rightZone(doc: jsPDF, title: string, content: string, zone: Zone): void {
    const z      = zone;
    const zoneH  = z.y1 - z.y0;
    const titleH = 12; // espacio reservado para el título
    const contentH = zoneH - titleH;

    let y = z.y0;

    // Barra lateral dorada
    doc.setFillColor(...this.C.gold);
    doc.rect(this.RC_X - 4, y - 1, 2, 9, 'F');

    // Título de sección
    doc.setFontSize(8); doc.setFont('helvetica', 'bold');
    doc.setTextColor(...this.C.navy);
    doc.text(title, this.RC_X, y + 4);
    y += titleH - 2;

    // Línea divisoria
    doc.setDrawColor(...this.C.lineDiv); doc.setLineWidth(0.2);
    doc.line(this.RC_X, y, this.RC_X + this.RC_W, y);
    y += 3;

    // Contenido adaptativo
    const { fontSize, lineH, lines } = this.fitFontSize(
      doc, content, this.RC_W, contentH - 3, 7, 10
    );
    doc.setFontSize(fontSize); doc.setFont('helvetica', 'normal');
    doc.setTextColor(...this.C.text);

    // Distribuir líneas con espaciado uniforme
    const totalTextH = lines.length * lineH;
    const extraSpace = Math.max(0, contentH - 3 - totalTextH);
    const extraPerLine = lines.length > 1 ? extraSpace / (lines.length - 1) : 0;
    // Limitar espaciado extra
    const finalLineH = lineH + Math.min(extraPerLine, 2.5);

    lines.forEach((l: string) => {
      if (y > z.y1) return;
      doc.text(l, this.RC_X, y);
      y += finalLineH;
    });
  }

  // ── PIE DE PÁGINA ────────────────────────────────────────────────────────────
  private drawFooter(doc: jsPDF): void {
    doc.setFillColor(...this.C.gold);
    doc.rect(this.LC_W + 2, this.H - 10, this.W - this.LC_W - 2, 10, 'F');
    doc.setTextColor(...this.C.navy);
    doc.setFontSize(6.5); doc.setFont('helvetica', 'bold');
    doc.text(
      'Generado con YoAprendo  |  ImpulNova by ULS  |  Universidad Luterana Salvadorena',
      this.LC_W + 6, this.H - 3.5,
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