import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from './../../users/services/users.service';
import { User } from './../../users/entities/user.entity';
import { PayloadToken } from './../models/token.model';
import { Profile } from 'passport-google-oauth20';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const { password, ...rta } = user.toJSON();
        return rta as User;
      }
    }
    return null;
  }

  async validateGoogleUser(profile: Profile) {
    const email = profile.emails[0].value;
    const user = await this.usersService.findByEmail(email);

    if (user) return user;
    const password = this.generateRandomPassword();
    const userDto: CreateUserDto = {
      ...user,
      email,
      password,
      name: profile.displayName ?? email.split('@')[0] ?? '',
    }
    const newUser = this.usersService.create(userDto);
    return newUser;
  }

  generateJWT(user: User) {
    const payload: PayloadToken = { sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  private generateRandomPassword(){
    const passwordLength = 10; // Longitud de la contraseña deseada

    const randomPassword = Math.random().toString(36).slice(-passwordLength);
    return randomPassword;
  }
}
