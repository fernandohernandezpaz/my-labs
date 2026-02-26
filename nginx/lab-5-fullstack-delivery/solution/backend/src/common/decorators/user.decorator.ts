import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestingUser } from '../types/request-user.type';

export const RequestUser = createParamDecorator(
  (data: keyof RequestingUser, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: RequestingUser = request.user;

    return data ? user?.[data] : user;
  },
);
