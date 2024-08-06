import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  contentChild,
  Input,
  output,
  TemplateRef,
} from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass">
      <ng-content select="img"></ng-content>

      <section>
        @for (item of list; track item.id) {
          <ng-container>
            <ng-template
              [ngTemplateOutlet]="listItemTemplate()"
              [ngTemplateOutletContext]="{ $implicit: item }"></ng-template>
          </ng-container>
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="this.add.emit()">
        Add
      </button>
    </div>
  `,
  styles: `
    .bg-light-blue {
      background-color: rgba(0, 50, 255, 0.1);
    }
    .bg-light-red {
      background-color: rgba(255, 50, 0, 0.1);
    }
    .bg-light-green {
      background-color: rgba(0, 255, 55, 0.1);
    }
  `,
  standalone: true,
  imports: [NgIf, NgFor, NgTemplateOutlet, ListItemComponent],
})
export class CardComponent {
  @Input() list: any[] | null = null;
  @Input() customClass = '';
  add = output();
  listItemTemplate = contentChild.required<TemplateRef<any>>('listItemRef');
}
