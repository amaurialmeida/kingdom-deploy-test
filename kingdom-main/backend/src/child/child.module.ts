// import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { RegisterController } from './controllers/child.controller';
// import { ChildService } from './services/child.service';
// import { Child, ChildSchema } from './schemas/child.schema';

// @Module({
//   imports: [
//     MongooseModule.forFeature([{ name: Child.name, schema: ChildSchema }]),
//   ],
//   controllers: [RegisterController],
//   providers: [ChildService],
//   exports: [ChildService],
// })
// export class ChildModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RegisterController } from './controllers/child.controller';
import { ChildService } from './services/child.service';
import { Child, ChildSchema } from './schemas/child.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Child.name, schema: ChildSchema }]),
  ],
  controllers: [RegisterController],
  providers: [ChildService],
})
export class ChildModule {}
