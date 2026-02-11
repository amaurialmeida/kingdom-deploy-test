import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '../guards/auth.guard';
import { AUTH_MESSAGES } from '../messages/auth.message';

@ApiTags('Auth')
@Controller()
export class AppController {
  @UseGuards(AuthGuard)
  @Get('auth')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Proteção das rotas através do token' })
  @ApiResponse({
    status: 200,
    description: AUTH_MESSAGES.AUTHORIZED,
  })
  @ApiResponse({
    status: 401,
    description: AUTH_MESSAGES.UNAUTHORIZED,
  })
  someProtectedRoute() {
    return { message: AUTH_MESSAGES.AUTHORIZED };
  }
}
