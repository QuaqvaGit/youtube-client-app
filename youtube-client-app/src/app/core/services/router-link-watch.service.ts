import { Injectable } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export default class RouterLinkWatchService {

  public get prevUrl(): string {
    return this.prevLinkUrl.replace('%3F', '?').replace('%3D', '=');
  }

  private prevLinkUrl: string;


  constructor(private router: Router) { 
    this.prevLinkUrl = '';
    this.router.events
      .pipe(filter((evt: unknown) => evt instanceof RoutesRecognized), pairwise())
      .subscribe((events: unknown[]) => {
        this.prevLinkUrl = (events as RoutesRecognized[])[0].urlAfterRedirects;
    });
  }
}
