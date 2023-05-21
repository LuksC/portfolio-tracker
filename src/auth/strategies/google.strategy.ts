import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import config from '../../config';
import { PayloadToken } from '../models/token.model';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(@Inject(config.KEY) configService: ConfigType<typeof config>) {
    super({
      clientID: configService.google.id,
      clientSecret: configService.google.secret,
      callbackURL: configService.google.callback,
      scope: ['email']
    });
  }

  validate(acess_token: string, refresh_token: string, profile: any, done: VerifyCallback) {
    console.log("🚀 ~ file: google.strategy.ts:21 ~ JwtStrategy ~ validate ~ profile:", profile)
    console.log("🚀 ~ file: google.strategy.ts:21 ~ JwtStrategy ~ validate ~ refresh_token:", refresh_token)
    console.log("🚀 ~ file: google.strategy.ts:21 ~ JwtStrategy ~ validate ~ acess_token:", acess_token)

    return profile;
  }
}
