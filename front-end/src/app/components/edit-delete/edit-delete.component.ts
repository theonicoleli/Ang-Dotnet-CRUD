import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-edit-delete',
  templateUrl: './edit-delete.component.html',
  styleUrls: ['./edit-delete.component.css']
})
export class EditDeleteComponent {
  @Input() color: string = '';
  @Input() text: string = '';
  @Input() url: string = '';
  @Output() deleteClick = new EventEmitter<void>();

  onDeleteClick(): void {
    this.deleteClick.emit();
  }
}