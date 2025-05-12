import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';

@Injectable()
export class UnknownExceptionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        throw new HttpException(
          { message: error.message, detail: error.detail },
          error.status as number ?? HttpStatus.INTERNAL_SERVER_ERROR,
          {
            cause: error,
          },
        );
      }),
    );
  }
}
