import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardType } from '../../model/card.model';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card (add)="addTeacher()" [list]="teachers" customClass="bg-light-red">
      <ng-template #listItemRef let-teacher>
        <app-list-item
          (deleteItem)="deleteTeacher(teacher.id)"
          [name]="teacher.firstName"></app-list-item>
      </ng-template>
      <img src="../assets/img/teacher.png" width="200px" />
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent, ListItemComponent],
})
export class TeacherCardComponent implements OnInit {
  teachers: Teacher[] = [];
  cardType = CardType.TEACHER;

  constructor(
    private http: FakeHttpService,
    private store: TeacherStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));

    this.store.teachers$.subscribe((t) => (this.teachers = t));
  }

  addTeacher(): void {
    console.log('cricquei');
    this.store.addOne(randTeacher());
  }
  deleteTeacher(id: number): void {
    this.store.deleteOne(id);
  }
}
