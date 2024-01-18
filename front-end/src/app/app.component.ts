import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Person } from '../assets/classes/Person';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  url: string = 'http://localhost:5012/api/Person';

  people: Person[] = [];

  title = 'angular17_without_standalone';

  addPerson: string = 'Add New Person';
  editPerson: string = 'Edit';
  deletePerson: string = 'Delete';
  addPersonLink: string = 'add-person';
  addPersonLinkPressed: boolean = false;

  editPersonColor: string = 'green';
  deletePersonColor: string = 'red';

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {}

  getPeopleData() {
    this.http.get<Person[]>(this.url).subscribe(
      (data: Person[]) => {
        this.people = data;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  isAddPersonRoute(): boolean {
    return this.router.url.includes('add-person');
  }

  isEditPersonRoute(): boolean {
    return this.router.url.includes('edit-person');
  }

  ngOnInit() {
    this.getPeopleData();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateRouteStatus();
      this.getPeopleData();
    });
  }

  isAddPersonRouteActive: boolean = this.isAddPersonRoute();
  isEditPersonRouteActive: boolean = this.isEditPersonRoute();

  updateRouteStatus() {
    this.isAddPersonRouteActive = this.isAddPersonRoute();
    this.isEditPersonRouteActive = this.isEditPersonRoute();
  }

  onAddPersonLinkPressed(isPressed: boolean): void {
    this.addPersonLinkPressed = isPressed;
  }

  onDeletePerson(personId: number): void {
    const isConfirmed = window.confirm('Are you sure you want to delete this person?');
  
    if (isConfirmed) {
      const url = `http://localhost:5012/api/Person/${personId}`;
      this.http.delete(url).subscribe(
        () => {
          console.log(`Person with ID ${personId} deleted successfully.`);
          this.getPeopleData();
        },
        (error) => {
          console.error('Error deleting person:', error);
        }
      );
    }
  }

  onEditPerson(personId: number): void {
    this.router.navigate(['/edit-person', personId]);
  }
}
