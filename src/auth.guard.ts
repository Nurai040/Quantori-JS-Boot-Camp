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
    if (!header) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    const bearer = header.split(' ')[0];
    const token = header.split(' ')[1];

    if (bearer !== 'Bearer' || !token) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    request.token = token;
    return true;
  }
}
