import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(user: {
    userId: string;
    email: string;
    name: string;
    surname: string;
  }) {
    // informações do token
    const payload = {
      sub: user.userId, // 'sub' é o padrão para ID de usuário
      email: user.email,
      name: user.name,
      surname: user.surname,
    };

    const token = this.jwtService.sign(payload);

    return { token };
  }
}
