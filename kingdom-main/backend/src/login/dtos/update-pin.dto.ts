import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length, Matches } from 'class-validator';
import { USER_MESSAGES } from 'src/register/messages/user.message';

export class UpdatePinDto {
  @ApiProperty({ description: 'PIN atual do usuário', example: '1234' })
  @IsNotEmpty({ message: USER_MESSAGES.PIN_REQUIRED })
  @Matches(/^\d+$/, { message: USER_MESSAGES.PIN_MUST_BE_NUMERIC })
  @Length(4, 4, { message: USER_MESSAGES.PIN_RULES })
  pinCode: string;

  @ApiProperty({ description: 'Novo PIN', example: '5678' })
  @IsNotEmpty({ message: USER_MESSAGES.FIELD_REQUIRED('PIN') })
  @Matches(/^\d+$/, { message: USER_MESSAGES.PIN_MUST_BE_NUMERIC })
  @Length(4, 4, { message: USER_MESSAGES.PIN_RULES })
  newPin: string;
}
