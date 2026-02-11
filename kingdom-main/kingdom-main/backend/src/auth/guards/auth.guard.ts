import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { AUTH_MESSAGES } from '../messages/auth.message';

interface JwtPayload {
  sub: string;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException({
        message: AUTH_MESSAGES.UNAUTHORIZED,
      });
    }

    try {
      const payload = this.jwtService.verify<JwtPayload>(token);
      request.userId = payload.sub;
    } catch {
      throw new UnauthorizedException({
        message: AUTH_MESSAGES.UNAUTHORIZED,
      });
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | null {
    return request.headers.authorization?.split(' ')[1] ?? null;
  }
}
