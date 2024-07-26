import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import { FakeHttpService } from '../../data-access/fake-http.service';
import { CardComponent } from '../../ui/card/card.component';
import { CardType } from './../../model/card.model';
import { City } from './../../model/city.model';
@Component({
  selector: 'app-city-card',
  template: `
    <app-card [list]="cities()" [type]="cardType()" customClass="bg-light-blue">
      <img src="assets/img/city.png" width="200px" />
    </app-card>
  `,
  styles: [
    `
      * .bg-light-blue {
        background-color: rgba(0, 0, 250, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent],
})
export class CityCardComponent implements OnInit {
  cities: WritableSignal<City[]> = signal([]);
  cardType = signal(CardType.CITY);
  private http = inject(FakeHttpService);
  private store = inject(CityStore);

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => {
      this.store.addAll(c);
    });
    this.store.cities$.subscribe((c) => {
      this.cities.set(c);
    });
  }
}
