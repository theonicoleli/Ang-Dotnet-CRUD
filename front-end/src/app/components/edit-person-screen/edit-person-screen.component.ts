import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Person } from '../../../assets/classes/Person';

@Component({
  selector: 'app-edit-person-screen',
  templateUrl: './edit-person-screen.component.html',
  styleUrls: ['./edit-person-screen.component.css']
})
export class EditPersonScreenComponent implements OnInit {

  @Input() addPersonLinkPressed: boolean = false;
  @Output() linkPressed = new EventEmitter<boolean>();
  editPersonId: number = 0;  // Removendo o Input para evitar confusões
  person: Person = new Person(0, '', 0, '', 0);
  notificationMessage: string | null = null;
  url: string = 'http://localhost:5012/api/Person';

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.editPersonId = +params['id'];  // '+' converte para número
      console.log('ngOnInit called. editPersonId:', this.editPersonId);

      if (this.editPersonId) {
        console.log('Calling loadPerson');
        this.loadPerson(this.editPersonId);
      }
    });
  }

  loadPerson(personId: number): void {
    console.log('loadPerson called. personId:', personId);
    const personUrl = `${this.url}/${personId}`;
    this.http.get<Person>(personUrl).subscribe(
      (person: Person) => {
        this.person = person;
        console.log('Person loaded successfully:', this.person);
      },
      (error) => {
        console.error('Error fetching person:', error);
      }
    );
  }

  personVerification(): boolean {
    return this.person && this.person.age !== null &&
      this.person.salary !== null && this.person.age >= 18
      && this.person.salary > 0;
  }

  showNotification(message: string): void {
    this.notificationMessage = message;

    setTimeout(() => {
      this.notificationMessage = null;
    }, 5000);
  }

  onSubmit(form: NgForm): void {
    if (form.invalid || !this.personVerification()) {
      this.showNotification('Invalid form submission. Please check your inputs.');
      console.error('Form data is incomplete or invalid. Cannot submit.');
      return;
    }

    const submitUrl = this.editPersonId
      ? `http://localhost:5012/api/Person/${this.editPersonId}`
      : 'http://localhost:5012/api/Person';

    const httpMethod = this.editPersonId ? 'put' : 'post';

    this.http[httpMethod](submitUrl, this.person, { responseType: 'text' }).subscribe(
      (response: any) => {
        console.log('Server Response:', response);
        const action = this.editPersonId ? 'edited' : 'created';
        console.log(`Person ${action} successfully:`, response);
        
        this.loadPerson(this.editPersonId);
        this.router.navigate(['/']); 
      },
      (error) => {
        const action = this.editPersonId ? 'editing' : 'creating';
        console.error(`Error ${action} person:`, error);
        this.showNotification(`Error ${action} person. Please try again.`);
      }
    );
  }
}
