// import { Injectable, BadRequestException } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model, Types } from 'mongoose';

// import { Child, ChildDocument } from '../schemas/child.schema';
// import { CreateChildDto } from '../dtos/child.dto';
// import { CHILD_MESSAGES } from '../messages/child.message';

// @Injectable()
// export class ChildService {
//   constructor(
//     @InjectModel(Child.name)
//     private readonly childModel: Model<ChildDocument>,
//   ) {}
//   // 2 - deixar o parametro com um nome mais apropriado ex: createChildDto e adicionar o userId
//   async createUser(dto: CreateChildDto) {
//     // 3 - pegar o userId do token
//     const responsibleId = new Types.ObjectId();

//     const totalChildren = await this.childModel.countDocuments({
//       responsibleId,
//     });

//     if (totalChildren >= 10) {
//       throw new BadRequestException(CHILD_MESSAGES.DUPLICATE_REGISTRATION);
//     }

//     const child = await this.childModel.create({
//       name: dto.name,
//       birthDate: new Date(dto.birthDate),
//       avatar: dto.avatar,
//       responsibleId,
//     });

//     return child;
//   }
// }

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Child, ChildDocument } from '../schemas/child.schema';
import { CreateChildDto } from '../dtos/child.dto';
import { CHILD_MESSAGES } from '../messages/child.message';

@Injectable()
export class ChildService {
  constructor(
    @InjectModel(Child.name)
    private readonly childModel: Model<ChildDocument>,
  ) {}

  async create(dto: CreateChildDto) {
    const responsibleId = new Types.ObjectId();

    const count = await this.childModel.countDocuments({ responsibleId });
    if (count >= 10) {
      throw new BadRequestException(CHILD_MESSAGES.MAX_CHILDREN_REACHED);
    }

    return this.childModel.create({
      ...dto,
      birthDate: new Date(dto.birthDate),
      responsibleId,
    });
  }

  async findAll() {
    return this.childModel.find().exec();
  }

  async findOne(id: string) {
    const child = await this.childModel.findById(id);
    if (!child) {
      throw new NotFoundException('Criança não encontrada');
    }
    return child;
  }

  async remove(id: string) {
    const child = await this.childModel.findByIdAndDelete(id);
    if (!child) {
      throw new NotFoundException('Criança não encontrada');
    }
  }
}
