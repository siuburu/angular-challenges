import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'heavyComputation',
  standalone: true,
  pure: true,
})
export class HeavyComputationPipe implements PipeTransform {
  transform(value: string, index: number, ...args: string[]): string {
    return `${value} - ${index}`;
  }
}
