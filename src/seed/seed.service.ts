import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { Setting } from 'src/setting/entities/setting.entity';
import { User } from 'src/user/entities/user.entity';
import { Role } from 'src/user/enums/role.enum';
import { Repository } from 'typeorm';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    
    @InjectRepository(Setting)
    private settingRepository: Repository<Setting>,
  ) {}

  async seed() {
    const user = await this.userRepository.findOne({
      where: { email: 'admin@test.com' },
    });

    if (!user) {
      const user = this.userRepository.create({
        email: 'admin@test.com',
        password: await hash('pass123456', 10),
        firstName: '管理者',
        lastName: '管理者',
        role: Role.ADMIN,
      });
      await this.userRepository.save(user);
    }

    const rewardPoints = await this.settingRepository.findOne({
      where: { name: 'reward_points' },
    });

    if (!rewardPoints) {
      const rewardPoints = this.settingRepository.create({
        name: 'reward_points',
        value: '10',
      });
      await this.settingRepository.save(rewardPoints);
    }

    const cutPoints = await this.settingRepository.findOne({
      where: { name: 'cut_points' },
    });

    if (!cutPoints) {
      const cutPoints = this.settingRepository.create({
        name: 'cut_points',
        value: '10',
      });
      await this.settingRepository.save(cutPoints);
    }
  }
}
