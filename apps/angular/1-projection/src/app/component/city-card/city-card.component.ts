import { Component, OnInit } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card (add)="addCity()" [list]="cities" customClass="bg-light-blue">
      <ng-template #listItemRef let-city>
        <app-list-item
          (deleteItem)="deleteCity(city.id)"
          [name]="city.name"></app-list-item>
      </ng-template>
      <img src="../assets/img/city.png" width="200px" />
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent, ListItemComponent],
})
export class CityCardComponent implements OnInit {
  cities: City[] = [];
  constructor(
    private http: FakeHttpService,
    private store: CityStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((t) => this.store.addAll(t));

    this.store.cities$.subscribe((t) => (this.cities = t));
  }

  addCity(): void {
    console.log('cricquei');
    this.store.addOne(randomCity());
  }
  deleteCity(id: number): void {
    this.store.deleteOne(id);
  }
}
