// import { ApiProperty } from '@nestjs/swagger';
// import {
//   IsDateString,
//   IsNotEmpty,
//   IsString,
//   Length,
//   Matches,
// } from 'class-validator';
// import { CHILD_MESSAGES } from '../messages/child.message';

// export class CreateChildDto {
//   @ApiProperty({
//     description: 'Nome da criança',
//     example: 'João',
//   })
//   @IsString({ message: CHILD_MESSAGES.FIELD_IS_STRING('Nome da criança') })
//   @Length(2, 50, {
//     message: CHILD_MESSAGES.FIELD_LENGTH_BETWEEN('Nome da criança', 2, 50),
//   })
//   @Matches(/^[A-ZÀ-Ú]/, {
//     message: CHILD_MESSAGES.FIELD_INITIAL_CAPITAL('Nome da criança'),
//   })
//   @Matches(/^[a-zA-ZÀ-ÿ\s]+$/, {
//     message: CHILD_MESSAGES.FIELD_ONLY_LETTERS_SPACES('Nome da criança'),
//   })
//   @IsNotEmpty({
//     message: CHILD_MESSAGES.FIELD_REQUIRED('Nome da criança'),
//   })
//   name: string;

//   @ApiProperty({
//     description: 'Data de nascimento da criança',
//     example: '2020-04-01',
//   })
//   @IsDateString(
//     {},
//     {
//       message: CHILD_MESSAGES.FIELD_DATE_INVALID('Data de nascimento'),
//     },
//   )
//   @IsNotEmpty({
//     message: CHILD_MESSAGES.FIELD_REQUIRED('Data de nascimento'),
//   })
//   // 4 - fazer a validação da data ( está sem @matches)
//   birthDate: string;

//   @ApiProperty({
//     description: 'Avatar selecionado para a criança',
//     example: 'avatar-01',
//   })
//   @IsString({
//     message: CHILD_MESSAGES.FIELD_IS_STRING('Avatar'),
//   })
//   @IsNotEmpty({
//     message: CHILD_MESSAGES.FIELD_REQUIRED('Avatar'),
//   })
//   avatar: string;
// }

import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { CHILD_MESSAGES } from '../messages/child.message';

export class CreateChildDto {
  @ApiProperty({ example: 'João' })
  @IsString({ message: CHILD_MESSAGES.FIELD_IS_STRING('Nome') })
  @Length(2, 50)
  @Matches(/^[A-ZÀ-Ú]/)
  @Matches(/^[a-zA-ZÀ-ÿ\s]+$/)
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '2020-04-01' })
  @IsDateString()
  @IsNotEmpty()
  birthDate: string;

  @ApiProperty({ example: 'avatar-01' })
  @IsString()
  @IsNotEmpty()
  avatar: string;
}
