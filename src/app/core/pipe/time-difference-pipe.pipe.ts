import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeDifferencePipe'
})
export class TimeDifferencePipePipe implements PipeTransform {

  transform(value: string): string {
    const diff = new Date().getTime() - new Date(value).getTime(); // Get the time difference in milliseconds
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    }
  }
}
