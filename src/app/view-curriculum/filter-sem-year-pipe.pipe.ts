import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'semyearFilter'
})
export class SemYearFilterPipe implements PipeTransform {
  transform(items: any[], year: string, semester: string): any[] {
    if (!items) {
      return [];
    }

    if (!year || !semester) {
      return items;
    }

    return items.filter(item => {
      if (item.year !== year) {
        return false;
      }

      if (item.semester !== semester) {
        return false;
      }

      return true;
    });
  }
}