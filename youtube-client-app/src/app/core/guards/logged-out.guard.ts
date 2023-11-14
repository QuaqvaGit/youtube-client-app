import { CanActivateFn } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import LoginService from 'src/app/auth/services/login.service';

const loggedOutGuard: CanActivateFn = () => firstValueFrom(new LoginService().loggedIn).then((value) => !value);

export default loggedOutGuard;
