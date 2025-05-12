import { Test, TestingModule } from '@nestjs/testing';
import { UserAttributionsController } from './user-attributions.controller';
import { UserAttributionsService } from './user-attributions.service';

describe('UserAttributionsController', () => {
  let controller: UserAttributionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserAttributionsController],
      providers: [UserAttributionsService],
    }).compile();

    controller = module.get<UserAttributionsController>(UserAttributionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
