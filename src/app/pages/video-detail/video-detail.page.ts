// src/app/pages/video-detail/video-detail.page.ts
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { COURSES, Course } from '../../models/course.model';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.page.html',
  styleUrls: ['./video-detail.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class VideoDetailPage implements OnInit {
  course: Course | null = null;
  safeYoutubeUrl: SafeResourceUrl | null = null;
  hasRealYoutube = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit() {
    const id     = Number(this.route.snapshot.paramMap.get('id'));
    this.course  = COURSES.find(c => c.id === id) || null;

    if (this.course?.youtubeUrl) {
      const videoId = this.extractYoutubeId(this.course.youtubeUrl);
      if (videoId) {
        this.hasRealYoutube  = true;
        this.safeYoutubeUrl  = this.sanitizer.bypassSecurityTrustResourceUrl(
          `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`,
        );
      }
    }
  }

  extractYoutubeId(url: string): string | null {
    const patterns = [
      /youtu\.be\/([\w-]{11})/,
      /youtube\.com\/watch\?v=([\w-]{11})/,
      /youtube\.com\/embed\/([\w-]{11})/,
    ];
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  }

  openInYoutube() {
    if (this.course?.youtubeUrl) {
      window.open(this.course.youtubeUrl, '_blank');
    }
  }

  getCategoryLabel(cat: string): string {
    const labels: Record<string, string> = {
      agro:   'Agroecología',
      oficio: 'Oficios',
      gastro: 'Gastronomía',
    };
    return labels[cat] || cat;
  }

  goBackToCategory() {
    this.router.navigate(['/tutorials']);
  }
}
