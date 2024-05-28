import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-msg-error',
  templateUrl: './msg-error.component.html',
  styleUrl: './msg-error.component.scss'
})
export class MsgErrorComponent {
  @Input() textMessageError!:string;
  @Output() closeError = new EventEmitter<void>();

  onClose(){
    this.closeError.emit();
  }
}
