import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'reverse'})
export class ReversePipe implements PipeTransform {

  transform(input: any): any {
    if (this.isString(input)) {
      return input.split('').reverse().join('');
    }

    return Array.isArray(input)
      ? input.reverse()
      : input;
  }

  isString(value: any) {
    return typeof value === 'string';
  }
}
