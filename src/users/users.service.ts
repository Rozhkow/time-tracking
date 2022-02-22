import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getUserById(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  async registrate(userDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(userDto);
    return newUser.save();
  }

  async removeUser(id: string): Promise<User> {
    return this.userModel.findByIdAndRemove(id);
  }

  //   async updateUser(id: string, userDto: UpdateUserDto): Promise<User> {
  //     return this.userModel.findByIdAndUpdate(id, userDto, { new: true });
  //   }

  //   async login(username: string, password: string): Promise<User> {
  //     this.userModel.findOne();
  //   }
}
