import { AuthService } from './../services/auth.service';
import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy, VerifyCallback, Profile } from 'passport-google-oauth20';
import config from '../../config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @Inject(config.KEY) configService: ConfigType<typeof config>,
    private authService: AuthService
  ) {
    super({
      clientID: configService.google.id,
      clientSecret: configService.google.secret,
      callbackURL: configService.google.callback,
      scope: ['email']
    });
  }

  async validate(acess_token: string, refresh_token: string, profile: Profile, done: VerifyCallback) {
    const user = await this.authService.validateGoogleUser(profile);
    if (!user) {
      throw new UnauthorizedException('not allow');
    }
    return user;
  }
}
