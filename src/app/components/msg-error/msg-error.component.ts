import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-msg-error',
  templateUrl: './msg-error.component.html',
  styleUrl: './msg-error.component.scss'
})
export class MsgErrorComponent {
  @Input() textMessageError!:string;
}
