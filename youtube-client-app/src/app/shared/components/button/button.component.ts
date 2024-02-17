import { CommonModule } from '@angular/common';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ButtonParameters } from '../button-params.model';

@Component({
  standalone: true,
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  imports: [CommonModule],
})
export default class ButtonComponent implements OnInit {
  @Input({ required: true }) parameters!: ButtonParameters;

  @Input() classBind?: { [className: string]: boolean };

  convertedStyles: { [property: string]: string } = {};

  classBinds!: { [className: string]: boolean };

  ngOnInit(): void {
    this.classBinds = { 'custom-button': true, ...this.classBind };
    this.onHoverLoss();
  }

  @HostListener('mouseover')
  onHover(): void {
    if (this.parameters.expandOnHover) this.convertedStyles['scale'] = '1.1';
    this.convertedStyles['border-color'] =
      this.parameters.hoverColors.borderColor ||
      this.convertedStyles['border-color'];
    this.convertedStyles['color'] =
      this.parameters.hoverColors.fontColor ||
      this.parameters.defaultColors.backgroundColor;
    this.convertedStyles['background-color'] =
      this.parameters.hoverColors.backgroundColor ||
      this.parameters.defaultColors.fontColor;
  }

  @HostListener('mouseout')
  onHoverLoss(): void {
    this.convertedStyles['scale'] = '1';
    this.convertedStyles['border-color'] =
      this.parameters.defaultColors.borderColor ||
      this.parameters.defaultColors.backgroundColor;
    this.convertedStyles['color'] = this.parameters.defaultColors.fontColor;
    this.convertedStyles['background-color'] =
      this.parameters.defaultColors.backgroundColor;
  }
}
