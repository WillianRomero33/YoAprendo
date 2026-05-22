// src/app/app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { addIcons } from 'ionicons';
import { IonApp, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';

import {
  home, videocam, documentText, documentTextOutline, documentOutline,
  business, analyticsOutline, arrowBackOutline, arrowForwardOutline,
  briefcaseOutline, bulbOutline, calculatorOutline, checkmarkCircleOutline,
  closeOutline, constructOutline, createOutline, downloadOutline, flashOutline,
  footstepsOutline, informationCircleOutline, logoYoutube, peopleOutline,
  personOutline, play, playCircleOutline, refreshOutline, saveOutline,
  schoolOutline, sparklesOutline, starOutline, timeOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IonApp,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
  showTabBar = false;

  private readonly noTabRoutes = ['/splash', '/video-detail'];

  constructor(private router: Router) {
    addIcons({
      home, videocam, documentText, documentTextOutline, documentOutline,
      business, analyticsOutline, arrowBackOutline, arrowForwardOutline,
      briefcaseOutline, bulbOutline, calculatorOutline, checkmarkCircleOutline,
      closeOutline, constructOutline, createOutline, downloadOutline, flashOutline,
      footstepsOutline, informationCircleOutline, logoYoutube, peopleOutline,
      personOutline, play, playCircleOutline, refreshOutline, saveOutline,
      schoolOutline, sparklesOutline, starOutline, timeOutline,
    });

    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        const url: string = e.urlAfterRedirects || e.url;
        this.showTabBar = !this.noTabRoutes.some(r => url.startsWith(r));
      });
  }

  navigateTo(page: string) {
    this.router.navigate([`/${page}`]);
  }
}