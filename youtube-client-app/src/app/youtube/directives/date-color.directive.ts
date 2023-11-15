import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDateColor]',
})
export default class DateColorDirective {
  private coloredProps = ['borderColor'];

  private colorDeep = false;

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

    this.colorElement(this.element.nativeElement, color);
    if (this.colorDeep) {
      const { children } = this.element.nativeElement;
      Array.from(children).forEach((child) => {
        this.colorElement(child, color);
      });
    }
  }

  @Input() set colorProps(value: string[]) {
    this.coloredProps = value;
  }

  @Input() set deepColor(value: boolean) {
    this.colorDeep = value;
  }

  constructor(private element: ElementRef, private renderer: Renderer2) {}

  private colorElement(element: unknown, color: string): void {
    this.coloredProps.forEach((prop) => {
      this.renderer.setStyle(element, prop, color);
    });
  }
}
