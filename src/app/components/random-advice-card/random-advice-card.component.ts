import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-random-advice-card',
  templateUrl: './random-advice-card.component.html',
  styleUrl: './random-advice-card.component.scss'
})
export class RandomAdviceCardComponent {
  @Input() author!:string;
  @Input() content!:string;
}
