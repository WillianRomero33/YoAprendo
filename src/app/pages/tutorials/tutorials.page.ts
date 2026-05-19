// src/app/pages/tutorials/tutorials.page.ts
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { COURSES, Course } from '../../models/course.model';

@Component({
  selector: 'app-tutorials',
  templateUrl: './tutorials.page.html',
  styleUrls: ['./tutorials.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TutorialsPage implements OnInit {
  courses = COURSES;
  filteredCourses: Course[] = [];

  // ← activeCat empieza vacío para mostrar la pantalla de selección de categoría
  activeCat: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.filteredCourses = this.courses;
  }

  // ← Requerido por (click)="selectCategory('agro')" etc.
  selectCategory(cat: string) {
    this.activeCat       = cat;
    this.filteredCourses = this.courses.filter(c => c.cat === cat);
  }

  // ← Requerido por (click)="clearFilter()"
  clearFilter() {
    this.activeCat       = '';
    this.filteredCourses = this.courses;
  }

  openCourse(course: Course) {
    this.router.navigate([`/video-detail/${course.id}`]);
  }

  getCategoryLabel(cat: string): string {
    const labels: Record<string, string> = {
      agro:   'Agroecología',
      oficio: 'Oficios',
      gastro: 'Gastronomía',
    };
    return labels[cat] || cat;
  }

  getCategoryEmoji(cat: string): string {
    const emojis: Record<string, string> = {
      agro:   '🌱',
      oficio: '🪚',
      gastro: '🍲',
    };
    return emojis[cat] || '📚';
  }

  getCourseCount(cat: string): number {
    return this.courses.filter(c => c.cat === cat).length;
  }

  hasRealYoutube(url?: string): boolean {
    if (!url) return false;
    return !url.toUpperCase().includes('EJEMPLO') && url.length > 10;
  }
}
