import { Component, OnInit, signal } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardType } from '../../model/card.model';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      (add)="addStudent()"
      [list]="students()"
      customClass="bg-light-green">
      <ng-template #listItemRef let-student>
        <app-list-item
          [name]="student.firstName"
          (deleteItem)="deleteStudent(student.id)"></app-list-item>
      </ng-template>
      <img src="../assets/img/student.webp" width="200px" />
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent, ListItemComponent],
})
export class StudentCardComponent implements OnInit {
  students = signal<Student[]>([]);
  cardType = CardType.STUDENT;

  constructor(
    private http: FakeHttpService,
    private store: StudentStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));

    this.store.students$.subscribe((s) => this.students.set(s));
  }
  addStudent(): void {
    console.log('cricquei no Student');
    this.store.addOne(randStudent());
  }
  deleteStudent(id: number): void {
    this.store.deleteOne(id);
  }
}
