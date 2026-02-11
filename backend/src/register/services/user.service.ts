import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { hash } from 'bcrypt';
import mongoose, { Model } from 'mongoose';
import { CreateUserDto } from '../dtos/user.dto';
import { USER_MESSAGES } from '../messages/user.message';
import { User, UserDocument } from '../schemas/user.squema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(UserDto: CreateUserDto): Promise<User> {
    const emailExists = await this.userModel.exists({ email: UserDto.email });

    if (emailExists) {
      throw new HttpException(
        { message: USER_MESSAGES.EMAIL_ALREADY_REGISTERED },
        409,
      );
    }
    if (UserDto.password !== UserDto.confirmPassword) {
      throw new HttpException(
        { message: USER_MESSAGES.CONFIRM_PASSWORD_MUST_MATCH },
        400,
      );
    }

    const hashedPassword = await hash(UserDto.password, 10);
    const hashedPinCode = await hash(UserDto.pinCode.toString(), 10);

    const created = new this.userModel({
      ...UserDto,
      password: hashedPassword,
      pinCode: hashedPinCode,
    });

    const saved = await created.save();

    const obj = saved.toObject();
    delete obj.password;
    delete obj.pinCode;

    return obj;
  }

  async findUserById(id: string): Promise<User> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpException({ message: USER_MESSAGES.USER_ID_INVALID }, 400);
    }
    const user = await this.userModel
      .findById(id)
      .select('-password -pinCode')
      .exec();
    if (!user)
      throw new HttpException({ message: USER_MESSAGES.USER_NOT_FOUND }, 404);
    return user;
  }
}
