import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>
  ) {
  }

  async create(createUserDto: CreateUserDto) {
    const newModel = new this.userModel(createUserDto);
    const hashPassword = await bcrypt.hash(newModel.password, 10);
    newModel.password = hashPassword;
    return newModel.save();
  }

  findAll() {
    return this.userModel.find().exec()
  }

  findOne(id: string) {
    return this.userModel.findById(id).exec()
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findByIdAndUpdate(id, { $set: updateUserDto }, { new: true }).exec()
    if (!user) {
      throw new NotFoundException(`User ${id} not found`)
    }
    return user;
  }

  remove(id: string) {
    return this.userModel.findByIdAndDelete(id).exec()
  }
}
