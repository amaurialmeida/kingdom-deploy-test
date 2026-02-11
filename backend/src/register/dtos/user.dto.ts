import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { capitalizeName } from 'src/common/filter/name-validation';
import { USER_MESSAGES } from '../messages/user.message';

export class CreateUserDto {
  // Name
  @ApiProperty({
    description: 'Nome do usuário',
    example: 'João',
  })
  @IsString({ message: USER_MESSAGES.FIELD_IS_STRING('Nome') })
  @Length(2, 50, { message: USER_MESSAGES.FIELD_LENGTH_BETWEEN('Nome', 2, 50) })
  @Transform(({ value }: { value: unknown }) => {
    if (typeof value !== 'string') return value;
    return capitalizeName(value);
  })
  @Matches(/^[a-zA-ZÀ-ÿ\s]+$/, {
    message: USER_MESSAGES.FIELD_ONLY_LETTERS_SPACES('Nome'),
  })
  @IsNotEmpty({ message: USER_MESSAGES.FIELD_REQUIRED('Nome') })
  name: string;

  // Surname
  @ApiProperty({
    description: 'Sobrenome do usuário',
    example: 'Silva',
  })
  @IsString({ message: USER_MESSAGES.FIELD_IS_STRING('Sobrenome') })
  @Length(2, 50, {
    message: USER_MESSAGES.FIELD_LENGTH_BETWEEN('Sobrenome', 2, 50),
  })
  @Transform(({ value }: { value: unknown }) => {
    if (typeof value !== 'string') return value;
    return capitalizeName(value);
  })
  @Matches(/^[a-zA-ZÀ-ÿ\s]+$/, {
    message: USER_MESSAGES.FIELD_ONLY_LETTERS_SPACES('Sobrenome'),
  })
  @IsNotEmpty({ message: USER_MESSAGES.FIELD_REQUIRED('Sobrenome') })
  surname: string;

  // Email
  @ApiProperty({
    description: 'Email do usuário',
    example: 'email@dominio.com',
  })
  @Matches(/^[^\s@]+@[^\s@]+\.(com|com\.br)$/, {
    message: USER_MESSAGES.EMAIL_INVALID_FORMAT,
  })
  @IsString({ message: USER_MESSAGES.FIELD_IS_STRING('Email') })
  @Length(3, 50, {
    message: USER_MESSAGES.FIELD_LENGTH_BETWEEN('Email', 3, 50),
  })
  @Transform(({ value }: { value: string | null | undefined }) =>
    value?.toLowerCase().trim(),
  )
  @IsNotEmpty({ message: USER_MESSAGES.FIELD_REQUIRED('Email') })
  email: string;

  // Password
  @ApiProperty({
    description: 'Senha do usuário',
    example: 'Teste123@',
  })
  @IsString({ message: USER_MESSAGES.FIELD_IS_STRING('Senha') })
  @IsNotEmpty({ message: USER_MESSAGES.FIELD_REQUIRED('Senha') })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])\S+$/,
    {
      message: USER_MESSAGES.PASSWORD_RULES,
    },
  )
  @Length(6, 10, {
    message: USER_MESSAGES.FIELD_LENGTH_BETWEEN('Senha', 6, 10),
  })
  password: string;

  // Confirm Password
  @ApiProperty({
    description: 'Confirmação da senha do usuário',
    example: 'Teste123@',
  })
  @IsString({ message: USER_MESSAGES.FIELD_IS_STRING('Senha') })
  @Length(6, 10, {
    message: USER_MESSAGES.FIELD_LENGTH_BETWEEN('Senha', 6, 10),
  })
  @IsNotEmpty({ message: USER_MESSAGES.FIELD_REQUIRED('Senha') })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])\S+$/,
    {
      message: USER_MESSAGES.PASSWORD_RULES,
    },
  )
  confirmPassword: string;

  // PIN Code
  @ApiProperty({
    description: 'Código PIN de 4 dígitos do usuário',
    example: '1234',
  })
  @IsString({ message: USER_MESSAGES.FIELD_IS_STRING('PIN') })
  @IsNotEmpty({ message: USER_MESSAGES.FIELD_REQUIRED('PIN') })
  @Matches(/^\d{4}$/, { message: USER_MESSAGES.PIN_CODE_RULES })
  pinCode: string;
}
