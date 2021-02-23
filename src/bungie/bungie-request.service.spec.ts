import { Test, TestingModule } from '@nestjs/testing';
import { BungieRequestService } from './bungie-request.service';

describe('BungieRequestService', () => {
  let service: BungieRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BungieRequestService],
    }).compile();

    service = module.get<BungieRequestService>(BungieRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
