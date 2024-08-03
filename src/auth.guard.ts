import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const header = request.headers.authorization;
    const bearer = header.split(' ')[0];
    const token = header.split(' ')[1];

    if (bearer !== 'Bearer' && !token) {
      throw new HttpException('Unauthorized', HttpStatus.FORBIDDEN);
    }

    request.token = token;
    return true;
  }
}
