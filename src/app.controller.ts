import { Controller, Get, Req } from '@nestjs/common';
import { DestinyManifest } from 'bungie-api-ts/destiny2/interfaces';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios'
import { AppService } from './app.service';
import { BungieRequestService } from './bungie/bungie-request.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly bungieRequest: BungieRequestService) { }

  @Get('')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/bungie')
  async helloBungie() {
    // return await this.appService.test();
  }

  @Get('/token')
  async token(){
    // return await this.bungieRequest.getAccessTokenFromRefreshToken();
  }

  @Get('/auth')
  getAuthResp(@Req() req) {
    console.log(req.query.code)
    return req.get('code')
  }
}
