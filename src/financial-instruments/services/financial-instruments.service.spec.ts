import { Test, TestingModule } from '@nestjs/testing';
import { FinancialInstrumentsService } from './financial-instruments.service';

describe('FinancialInstrumentsService', () => {
  let service: FinancialInstrumentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FinancialInstrumentsService],
    }).compile();

    service = module.get<FinancialInstrumentsService>(FinancialInstrumentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
