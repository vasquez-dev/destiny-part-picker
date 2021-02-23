import { Injectable } from '@nestjs/common';
import { AbstractRequestService } from 'src/bungie/abstract-request.service';
import { axiosBungieClientFactory } from 'src/bungie/bungie-request-config.factories';
import axios, { AxiosInstance } from 'axios'
import axiosRetry from 'axios-retry';

/**
 * An OAuth token, either authorization or refresh.
 */
export interface Token {
    /** The oauth token key */
    value: string;
    /** The token expires this many seconds after it is acquired. */
    expires: number;
    name: 'access' | 'refresh';
    /** A UTC epoch milliseconds timestamp representing when the token was acquired. */
    inception: number;
  }
  
  export interface Tokens {
    accessToken: Token;
    refreshToken?: Token;
    bungieMembershipId: string;
  }

@Injectable()
export class BungieRequestService extends AbstractRequestService {
    private latestTokens: Tokens = null;
    private TOKEN_URL = 'https://www.bungie.net/platform/app/oauth/token/';

    constructor(){
        super(axiosBungieClientFactory())
        // this.applyTokenInterceptor(this.axiosRef)
    }

    // async applyTokenInterceptor(client: AxiosInstance) {
    //   client.interceptors.request.use(async (config) => {
    //     if(!this.latestTokens){
    //       await this.updateBungieToken();
    //     }
    //   })
    // }

    // async updateBungieAccessToken() {
    //   const tokenClient = axios.create();
    //   axiosRetry(tokenClient, {retries: 3, retryDelay: axiosRetry.exponentialDelay});
    //   try{
    //     token = getAccessTokenFromRefreshToken();
    //   }
    // }

    async getAccessTokenFromRefreshToken(client: AxiosInstance, refreshToken: Token){
      const body = new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken.value,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET
      });
      const resp = await client.post(this.TOKEN_URL, body, { headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      }});
      return resp;
    }

    async getAccessTokenFromCode(client: AxiosInstance, code: string){
      const body = new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET
      });
      const resp = await client.post(this.TOKEN_URL, body, { headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      }});
      return resp;
    }
}
