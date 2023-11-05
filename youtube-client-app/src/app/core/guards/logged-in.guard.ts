import { CanActivateFn, createUrlTreeFromSnapshot } from '@angular/router';
import LoginService from 'src/app/auth/services/login.service';

const loggedInGuard: CanActivateFn = (route) => new LoginService().loggedIn || createUrlTreeFromSnapshot(route, ['/login']);

export default loggedInGuard;
