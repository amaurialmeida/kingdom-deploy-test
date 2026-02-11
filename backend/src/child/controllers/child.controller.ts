// import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
// import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
// import { AUTH_MESSAGES } from 'src/auth/messages/auth.message';
// import { CreateChildDto } from '../dtos/child.dto';
// import { ChildService } from '../services/child.service';
// import { USER_MESSAGES } from 'src/register/messages/user.message';

// @ApiTags('Child')
// @Controller('child')
// export class RegisterController {
//   constructor(private readonly childService: ChildService) {}

//   // 1-  proteger as rotas no swagger

//   @Post('register')
//   @HttpCode(HttpStatus.CREATED)
//   @ApiOperation({
//     summary: 'Cadastro de nova criança',
//     description: 'Endpoint para cadastro de nova criança na plataforma.',
//   })
//   @ApiResponse({
//     status: 201,
//     description: USER_MESSAGES.REGISTRATION_SUCCESS,
//   })
//   @ApiResponse({ status: 400, description: AUTH_MESSAGES.BAD_REQUEST })
//   @ApiResponse({
//     status: 409,
//     description: USER_MESSAGES.USER_ALREADY_REGISTERED,
//   })
//   // 5 - colocar o userId como parametro
//   async registerChild(@Body() ChildDto: CreateChildDto) {
//     const child = await this.childService.createUser(ChildDto);
//     return { message: USER_MESSAGES.REGISTRATION_SUCCESS, data: child };
//   }
// }

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateChildDto } from '../dtos/child.dto';
import { ChildService } from '../services/child.service';
import { USER_MESSAGES } from 'src/register/messages/user.message';
import { AUTH_MESSAGES } from 'src/auth/messages/auth.message';

@ApiTags('Child')
@Controller('child')
export class RegisterController {
  constructor(private readonly childService: ChildService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Cadastro de nova criança' })
  @ApiResponse({ status: 201, description: USER_MESSAGES.REGISTRATION_SUCCESS })
  @ApiResponse({ status: 400, description: AUTH_MESSAGES.BAD_REQUEST })
  async registerChild(@Body() dto: CreateChildDto) {
    const child = await this.childService.create(dto);
    return { message: USER_MESSAGES.REGISTRATION_SUCCESS, data: child };
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as crianças' })
  async findAll() {
    return this.childService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar criança por ID' })
  async findOne(@Param('id') id: string) {
    return this.childService.findOne(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover criança' })
  async remove(@Param('id') id: string) {
    await this.childService.remove(id);
  }
}
