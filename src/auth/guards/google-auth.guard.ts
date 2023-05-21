import { Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  constructor(private reflector: Reflector) {
    super();
  }

  // canActivate(context: ExecutionContext) {
  //   const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
  //   if (isPublic) {
  //     return true;
  //   }
  //   return super.canActivate(context);
  // }

  async canActivate(context: ExecutionContext) {
    console.log("🚀 ~ file: google-auth.guard.ts:22 ~ GoogleAuthGuard ~ canActivate ~ canActivate:", "canActivate")
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) {
      return true;
    }

    const activate = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    await super.logIn(request);
    return activate;
  }
}
