import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ROLES_KEY } from './roles.decorator';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private jwtService: JwtService,
        private userService: UserService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const roles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException('ログインしていません。ログインしてください。');
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.SECRET,
            });
            const user = await this.userService.findOne(payload.id);
            request.user = user;
        } catch (err) {
            console.log(err);
            throw new UnauthorizedException('ログインしていません。ログインしてください。');
        }

        if (roles && request.user.role) {
            if (roles.some(role => role == request.user.role))
                return true;
            throw new ForbiddenException('権限を確認してください。');
        }

        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];

        return type === 'Bearer' ? token : undefined;
    }
}
