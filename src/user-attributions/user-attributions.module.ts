import { Module } from '@nestjs/common';
import { UserAttributionsService } from './user-attributions.service';
import { UserAttributionsController } from './user-attributions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAttribution } from './entities/user-attribution.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserAttribution])],
  controllers: [UserAttributionsController],
  providers: [UserAttributionsService],
})
export class UserAttributionsModule {}
