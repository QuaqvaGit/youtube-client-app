import { CanActivateFn } from '@angular/router';
import LoginService from 'src/app/auth/services/login.service';

const loggedOutGuard: CanActivateFn = () => !new LoginService().loggedIn;

export default loggedOutGuard;
