import { Test, TestingModule } from '@nestjs/testing';
import { PenyewaanController } from './penyewaan.controller';

describe('PenyewaanController', () => {
  let controller: PenyewaanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PenyewaanController],
    }).compile();

    controller = module.get<PenyewaanController>(PenyewaanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
