import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { Setting } from './entities/setting.entity';

@Injectable()
export class SettingService {
  constructor(
    @InjectRepository(Setting)
    private settingRepository: Repository<Setting>,
  ) {}

  async create(createSettingDto: CreateSettingDto) {
    const setting = await this.settingRepository.findOne({
      where: { name: createSettingDto.name },
    });
    if (setting) {
      throw new BadRequestException('Setting already exists');
    }
    return this.settingRepository.save(createSettingDto);
  }

  async findAll() {
    const settings = await this.settingRepository.find();
    return settings.reduce(
      (prev: Record<string, string>, curr: Setting) => ({
        ...prev,
        [curr.name]: curr.value,
      }),
      {},
    );
  }

  async findOne(name: string) {
    const setting = await this.settingRepository.findOneBy({ name });
    if (!setting) {
      throw new NotFoundException('Setting not found');
    }
    return setting;
  }

  update(name: string, updateSettingDto: UpdateSettingDto) {
    return this.settingRepository.update({ name }, updateSettingDto);
  }

  remove(name: string) {
    return this.settingRepository.delete(name);
  }
}
