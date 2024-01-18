import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent {

  @Input() addPersonLinkPressed: boolean = false;
  @Output() linkPressed = new EventEmitter<boolean>();

  url: string = "http://localhost:5012/api/Person";

  person = {
    name: '',
    age: null,
    work: '',
    salary: null
  };

  notificationMessage: string | null = null;

  constructor(private router: Router, private http: HttpClient) {}

  personVerification(): boolean {
    return this.person && this.person.age !== null && 
    this.person.salary !== null && this.person.age >= 18 
    && this.person.salary > 0;
  }

  onSubmit(form: NgForm) {
    if (form.invalid || !this.personVerification()) {
      this.showNotification('Invalid form submission. Please check your inputs.');
      console.error('Form data is incomplete or invalid. Cannot submit.');
      return;
    }

    this.http.post(this.url, this.person, { responseType: 'text' }).subscribe(
      (response: any) => {
        console.log('Server Response:', response);
        console.log('Person created successfully:', response);
        this.toggleAddPerson();
      },
      (error) => {
        console.error('Error creating person:', error);
        this.showNotification('Error creating person. Please try again.');
      }
    );    
  }  

  toggleAddPerson() {
    this.router.navigate(['/']);
    this.linkPressed.emit(false);
  }

  private showNotification(message: string) {
    this.notificationMessage = message;

    setTimeout(() => {
      this.notificationMessage = null;
    }, 5000);
  }
}
