import { HttpModule, Module } from '@nestjs/common';
import { BungieRequestService } from './bungie-request.service';
import { BungieService } from './bungie.service';

@Module({
  imports: [HttpModule.registerAsync({
    useFactory: () => ({
      timeout: 5000,
      maxRedirects: 5
    })
  })],
  providers: [BungieService, BungieRequestService],
  exports: [BungieRequestService]
})
export class BungieModule {}
 