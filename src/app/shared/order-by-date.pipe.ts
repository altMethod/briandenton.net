import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderByDate'
})
export class OrderByDatePipe implements PipeTransform {

 transform(array: Array<string>, args: string): Array<string> {

  // tslint:disable-next-line:curly
  if (!array || array === undefined || array.length === 0) return null;

    array.sort((a: any, b: any) => {
      if (a.posted_date < b.posted_date) {
        return -1;
      } else if (a.posted_date > b.posted_date) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }

}
