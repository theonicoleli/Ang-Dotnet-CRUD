import { Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-first-component',
  templateUrl: './first-component.component.html',
  styleUrl: './first-component.component.css'
})
export class FirstComponentComponent {

  @Output() linkPressed = new EventEmitter<boolean>();

  @Input() text: string = '';

  @Input() link: string = '';

  @Input() addPersonValue: boolean = false;

  getLinkPressedValue() {
    return this.linkPressed;
  }

  onPressButton(): void {
    this.linkPressed.emit(true);
  }

}
