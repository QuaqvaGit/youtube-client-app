import { CanActivateFn, createUrlTreeFromSnapshot } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import LoginService from 'src/app/auth/services/login.service';

const loggedInGuard: CanActivateFn = (route) =>
  firstValueFrom(new LoginService().loggedIn).then((loggedIn) => loggedIn || createUrlTreeFromSnapshot(route, ['/login']));

export default loggedInGuard;
