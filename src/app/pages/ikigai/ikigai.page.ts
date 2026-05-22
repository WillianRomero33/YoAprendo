// src/app/pages/ikigai/ikigai.page.ts
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StorageService } from '../../services/storage.service';
import { AiService } from '../../services/ai.service';

@Component({
  selector: 'app-ikigai',
  templateUrl: './ikigai.page.html',
  styleUrls: ['./ikigai.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class IkigaiPage implements OnInit {
  answers = { q1: '', q2: '', q3: '', q4: '' };
  result: string = '';

  constructor(
    private router: Router,
    private storage: StorageService,
    private aiService: AiService,
  ) {}

  async ngOnInit() {
    const saved = await this.storage.get<typeof this.answers>('ikigaiAnswers');
    if (saved && typeof saved === 'object') {
      this.answers = saved;
    }
    const savedResult = await this.storage.get<string>('ikigaiResult');
    if (typeof savedResult === 'string') {
      this.result = savedResult;
    }
  }

  async saveAnswers() {
    await this.storage.set('ikigaiAnswers', this.answers);
  }

  async analyzeIkigai() {
    await this.saveAnswers();
    this.result = this.aiService.analyzeIkigai(this.answers);
    await this.storage.set('ikigaiResult', this.result);
  }

  //(click)="saveAndContinue()" en el HTML
  async saveAndContinue() {
    await this.saveAnswers();
    await this.storage.set('ikigaiResult', this.result);
    this.router.navigate(['/tutorials']);
  }
}
