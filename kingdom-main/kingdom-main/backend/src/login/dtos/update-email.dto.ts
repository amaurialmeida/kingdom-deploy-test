import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { USER_MESSAGES } from 'src/register/messages/user.message';

export class UpdateEmailDto {
  @ApiProperty({ description: 'PIN do usuário', example: '1234' })
  @IsNotEmpty({ message: USER_MESSAGES.FIELD_REQUIRED('PIN') })
  @Matches(/^\d+$/, { message: USER_MESSAGES.PIN_MUST_BE_NUMERIC })
  @Length(4, 4, { message: USER_MESSAGES.PIN_RULES })
  pinCode: string;

  @ApiProperty({ description: 'Novo email', example: 'teste@exemplo.com' })
  @IsNotEmpty({ message: USER_MESSAGES.FIELD_REQUIRED('Email') })
  @Matches(/^[^\s@]+@[^\s@]+\.(com|com\.br)$/, {
    message: USER_MESSAGES.EMAIL_INVALID_FORMAT,
  })
  @IsString({ message: USER_MESSAGES.FIELD_IS_STRING('Email') })
  @Length(2, 50, {
    message: USER_MESSAGES.FIELD_LENGTH_BETWEEN('Email', 2, 50),
  })
  newEmail: string;
}
