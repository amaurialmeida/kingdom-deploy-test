import {
  Body,
  Controller,
  Delete,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginDto } from 'src/login/dtos/login.dto';
import { LoginService } from '../services/login.service';
import { DeleteAccountDto } from '../dtos/delete-account.dto';
import { UpdateEmailDto } from '../dtos/update-email.dto';
import { UpdatePinDto } from '../dtos/update-pin.dto';
import { AUTH_MESSAGES } from 'src/auth/messages/auth.message';
import { USER_MESSAGES } from 'src/register/messages/user.message';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import type { Request } from 'express';

@ApiTags('Auth')
@Controller('auth')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('login')
  @ApiOperation({ summary: 'Autenticação do usuário e retorno do token' })
  @ApiResponse({
    status: 200,
    description: AUTH_MESSAGES.AUTHORIZED,
  })
  @ApiResponse({ status: 400, description: AUTH_MESSAGES.BAD_REQUEST })
  @ApiResponse({ status: 401, description: AUTH_MESSAGES.UNAUTHORIZED })
  async login(@Body() loginDto: LoginDto) {
    return this.loginService.login(loginDto);
  }

  @Delete('delete-account')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Deletar a conta do usuário' })
  @ApiResponse({
    status: 200,
    description: USER_MESSAGES.DELETE_ACCOUNT_SUCCESS,
  })
  @ApiResponse({ status: 400, description: AUTH_MESSAGES.BAD_REQUEST })
  @ApiResponse({ status: 401, description: AUTH_MESSAGES.UNAUTHORIZED })
  async deletingAccount(@Req() req: Request, @Body() body: DeleteAccountDto) {
    const userId = req.userId;
    return this.loginService.deleteAccount(userId, body.pinCode);
  }

  @Patch('update-email')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar o email do usuário' })
  @ApiResponse({ status: 200, description: USER_MESSAGES.EMAIL_UPDATE_SUCESS })
  @ApiResponse({ status: 400, description: AUTH_MESSAGES.BAD_REQUEST })
  @ApiResponse({ status: 401, description: AUTH_MESSAGES.UNAUTHORIZED })
  @Patch('update-email')
  async updateEmail(@Req() req: Request, @Body() body: UpdateEmailDto) {
    const userId = req.userId;

    return this.loginService.updateEmail(userId, body.pinCode, body.newEmail);
  }

  @Patch('update-pin')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar o PIN do usuário' })
  @ApiResponse({ status: 200, description: USER_MESSAGES.PIN_UPDATE_SUCCESS })
  @ApiResponse({ status: 400, description: AUTH_MESSAGES.BAD_REQUEST })
  @ApiResponse({ status: 401, description: AUTH_MESSAGES.UNAUTHORIZED })
  async updatePin(@Req() req: Request, @Body() body: UpdatePinDto) {
    const userId = req.userId;

    return this.loginService.updatePin(userId, body.pinCode, body.newPin);
  }
}
