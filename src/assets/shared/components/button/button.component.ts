import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonTypes } from 'src/assets/model/button-types';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() ButtonTypes!: ButtonTypes;
  @Input() disabled = false;
  @Output() clicked = new EventEmitter<void>();

  get buttonClass(): string {
    return `btn-${this.ButtonTypes}`;
  }

  onClick(): void {
    this.clicked.emit();
  }
}
