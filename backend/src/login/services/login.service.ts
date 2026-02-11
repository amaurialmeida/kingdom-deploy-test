import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from '../dtos/login.dto';
import { User, UserDocument } from 'src/register/schemas/user.squema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/services/auth.service';
import { USER_MESSAGES } from 'src/register/messages/user.message';

@Injectable()
export class LoginService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private authService: AuthService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email }).select('+password');

    if (!user) {
      throw new UnauthorizedException({
        message: USER_MESSAGES.EMAIL_OR_PASSWORD_INCORRECT,
      });
    }

    const passwordMatch = await bcrypt.compare(password.trim(), user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException({
        message: USER_MESSAGES.EMAIL_OR_PASSWORD_INCORRECT,
      });
    }

    const data = this.authService.generateToken({
      userId: user._id.toString(),
      email: user.email,
      name: user.name,
      surname: user.surname,
    });

    return {
      message: USER_MESSAGES.LOGIN_SUCCESS,
      data,
    };
  }

  async deleteAccount(userId: string, pinCode: string) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new BadRequestException({
        message: USER_MESSAGES.USER_ID_INVALID,
      });
    }
    const user = await this.userModel.findById(userId).select('+pinCode');

    if (!user) {
      throw new BadRequestException({
        message: USER_MESSAGES.USER_NOT_FOUND,
      });
    }

    const isPinValid = await bcrypt.compare(pinCode, user.pinCode);
    if (!isPinValid) {
      throw new BadRequestException({
        message: USER_MESSAGES.PIN_INCORRECT,
      });
    }

    await this.userModel.findByIdAndDelete(userId);

    return { message: USER_MESSAGES.DELETE_ACCOUNT_SUCCESS };
  }

  async updatePin(userId: string, pinCode: string, newPin: string) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new BadRequestException({
        message: USER_MESSAGES.USER_ID_INVALID,
      });
    }
    const user = await this.userModel.findById(userId).select('+pinCode');

    if (!user) {
      throw new BadRequestException({
        message: USER_MESSAGES.USER_NOT_FOUND,
      });
    }

    const isPinValid = await bcrypt.compare(pinCode, user.pinCode);
    if (!isPinValid) {
      throw new BadRequestException({
        message: USER_MESSAGES.PIN_INCORRECT,
      });
    }
    const isPinExisting = pinCode === newPin;
    if (isPinExisting) {
      throw new BadRequestException({
        message: USER_MESSAGES.PIN_ALREADY_REGISTERED,
      });
    }

    const hashedPin = await bcrypt.hash(newPin, 10);

    await this.userModel.findByIdAndUpdate(userId, { pinCode: hashedPin });

    return { message: USER_MESSAGES.PIN_UPDATE_SUCCESS };
  }

  async updateEmail(userId: string, pinCode: string, newEmail: string) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new BadRequestException(USER_MESSAGES.USER_ID_INVALID);
    }
    const user = await this.userModel.findById(userId).select('+pinCode');

    if (!user) {
      throw new BadRequestException({
        message: USER_MESSAGES.USER_NOT_FOUND,
      });
    }

    const isPinValid = await bcrypt.compare(pinCode, user.pinCode);
    if (!isPinValid) {
      throw new BadRequestException({
        message: USER_MESSAGES.PIN_INCORRECT,
      });
    }

    const isEmailExisting = user.email === newEmail;
    if (isEmailExisting) {
      return { message: USER_MESSAGES.EMAIL_ALREADY_REGISTERED };
    }
    await this.userModel.findByIdAndUpdate(userId, { email: newEmail });

    return { message: USER_MESSAGES.EMAIL_UPDATE_SUCESS };
  }
}
