import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AUTH_MESSAGES } from 'src/auth/messages/auth.message';
import { CreateUserDto } from '../dtos/user.dto';
import { USER_MESSAGES } from '../messages/user.message';
import { UserService } from '../services/user.service';

@ApiTags('Register')
@Controller('user')
export class RegisterController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Cadastro de novo usuário',
    description: 'Endpoint para cadastro de novo usuário na plataforma.',
  })
  @ApiResponse({ status: 201, description: USER_MESSAGES.REGISTRATION_SUCCESS })
  @ApiResponse({ status: 400, description: AUTH_MESSAGES.BAD_REQUEST })
  @ApiResponse({
    status: 409,
    description: USER_MESSAGES.USER_ALREADY_REGISTERED,
  })
  async registerUser(@Body() UserDto: CreateUserDto) {
    const user = await this.userService.createUser(UserDto);
    return { message: USER_MESSAGES.REGISTRATION_SUCCESS, data: user };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Busca usuário por ID',
    description: 'Endpoint para buscar um usuário salvo pelo seu ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do usuário a ser buscado',
    type: String,
    example: '696a775b7369b60210df7b26',
  })
  @ApiResponse({ status: 200, description: USER_MESSAGES.USER_FOUND })
  @ApiResponse({ status: 400, description: USER_MESSAGES.USER_ID_INVALID })
  @ApiResponse({ status: 404, description: USER_MESSAGES.USER_NOT_FOUND })
  async checkUserSaved(@Param('id') id: string) {
    const user = await this.userService.findUserById(id);
    return { message: USER_MESSAGES.USER_FOUND, data: user };
  }
}
