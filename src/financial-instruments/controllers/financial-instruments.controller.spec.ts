import { Test, TestingModule } from '@nestjs/testing';
import { FinancialInstrumentsController } from './financial-instruments.controller';
import { FinancialInstrumentsService } from '../services/financial-instruments.service';

describe('FinancialInstrumentsController', () => {
  let controller: FinancialInstrumentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FinancialInstrumentsController],
      providers: [FinancialInstrumentsService],
    }).compile();

    controller = module.get<FinancialInstrumentsController>(FinancialInstrumentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
