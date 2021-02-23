import { HttpService, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosResponse, AxiosError } from 'axios'
import { DestinyManifest } from 'bungie-api-ts/destiny2/interfaces';
import {catchError, map} from 'rxjs/operators'

@Injectable()
export class AppService {

  constructor() {}
  getHello(): string {
    return 'Hello World!';
  }

  // test(): Observable<DestinyManifest> {
  //     return this.httpService.get('https://www.bungie.net/Platform/Destiny2/Manifest/').pipe(
  //       catchError((err: AxiosError)=> {
  //         console.log(err);
  //         throw new InternalServerErrorException('Something bad happened');
  //       }),
  //       map((res: AxiosResponse<DestinyManifest>) => {
  //         console.log(res)
  //         return res?.data;
  //       })
  //     );
  // }

  
}
