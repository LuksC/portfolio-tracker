import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Investment } from '../entities/investment.entity';
import { CreateInvestmentDto } from '../dto/create-investment.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Investment.name) private investmentModel: Model<Investment>,
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

  addInvestment(createInvestementsDto: CreateInvestmentDto) {
    const newModel = new this.investmentModel(createInvestementsDto)
    return newModel.save()
  }

  async getInvestments(id: string) {
    return await this.investmentModel.find({user: id}).exec()
  }

  async getOneInvestment(userId: string, investmentId: string) {
    console.log(investmentId, userId)
    return await this.investmentModel.findOne({user: userId, _id: investmentId}).populate('user').populate('instrument_type').exec()
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
