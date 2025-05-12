import { Injectable } from '@nestjs/common';
import { CreateUserAttributionDto } from './dto/create-user-attribution.dto';
import { UpdateUserAttributionDto } from './dto/update-user-attribution.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAttribution } from './entities/user-attribution.entity';

@Injectable()
export class UserAttributionsService {
  constructor(
    @InjectRepository(UserAttribution)
    private userAttributionRepository: Repository<UserAttribution>,
  ) {}

  create(createUserAttributionDto: CreateUserAttributionDto) {
    return this.userAttributionRepository.save(createUserAttributionDto);
  }

  findAll() {
    return this.userAttributionRepository.find();
  }

  findOne(id: number) {
    return this.userAttributionRepository.findOne({ where: { id } });
  }

  update(id: number, updateUserAttributionDto: UpdateUserAttributionDto) {
    return this.userAttributionRepository.update(id, updateUserAttributionDto);
  }

  remove(id: number) {
    return this.userAttributionRepository.delete(id);
  }
}
