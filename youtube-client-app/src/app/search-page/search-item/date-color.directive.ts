import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDateColor]'
})
export default class DateColorDirective {
  @Input('appDateColor') set publishDate(value: string) {
    const publishDate = new Date(value);
    const daysDiff = Math.floor(
      (Date.now() - publishDate.getTime()) / (1000 * 3600 * 24),
    );

    const now = new Date();
    const monthsDiff =
      now.getMonth() -
      publishDate.getMonth() +
      12 * (now.getFullYear() - publishDate.getFullYear());

    let color = 'blue';
    if (monthsDiff >= 6) color = 'red';
    else if (monthsDiff > 1) color = 'yellow';
    else if (daysDiff >= 7) color = 'green';

    this.renderer.setStyle(this.element.nativeElement, 'borderColor', color);
  }

  constructor(private element: ElementRef, private renderer: Renderer2) {}

}
