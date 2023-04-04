import { Pipe, PipeTransform } from '@angular/core';
import { firstSemContent } from './view-curriculum.component';
@Pipe({
  name: 'semesterFilter'
})
export class secondSemFilter implements PipeTransform {
    transform(items: firstSemContent[], semester: string): any {
        if (!items) return [];
        if (!semester) return items;
    
        return items.filter(item => item.semester === semester);
      }
}