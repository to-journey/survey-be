import { Test, TestingModule } from '@nestjs/testing';
import { UserAttributionsService } from './user-attributions.service';

describe('UserAttributionsService', () => {
  let service: UserAttributionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserAttributionsService],
    }).compile();

    service = module.get<UserAttributionsService>(UserAttributionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
