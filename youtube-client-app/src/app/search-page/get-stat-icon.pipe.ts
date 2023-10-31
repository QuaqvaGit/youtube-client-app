import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getStatIcon'
})
export default class GetStatIconPipe implements PipeTransform {
  private faClasses: {[key: string]: string} = {
    likeCount: 'fa-thumbs-up',
    dislikeCount: 'fa-thumbs-down',
    favoriteCount: 'fa-heart',
    viewCount: 'fa-eye',
    commentCount: 'fa-comment'
  };

  transform(value: string): string {
    return this.faClasses[value] || value;
  }

}
