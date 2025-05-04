import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-custom-alert',
  templateUrl: './custom-alert.component.html',
  styleUrls: ['./custom-alert.component.scss']
})
export class CustomAlertComponent {
  @Input() title = 'Mensaje';
  @Input() message = '';
  @Input() type: 'success' | 'error' | 'confirm' = 'success';
  @Output() confirm = new EventEmitter<boolean>();

  onConfirm(result: boolean) {
    this.confirm.emit(result);
  }

}
