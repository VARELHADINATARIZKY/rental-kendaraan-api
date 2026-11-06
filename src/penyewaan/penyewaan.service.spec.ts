import { Test, TestingModule } from '@nestjs/testing';
import { PenyewaanService } from './penyewaan.service';

describe('PenyewaanService', () => {
  let service: PenyewaanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PenyewaanService],
    }).compile();

    service = module.get<PenyewaanService>(PenyewaanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
