import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as fs from 'fs'
import {v4 as uuidv4} from 'uuid'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions: {
      key: fs.readFileSync(process.env.KEY_PATH),
      cert: fs.readFileSync(process.env.CERT_PATH)
    }
  });

  const config = new DocumentBuilder()
    .setTitle('Example app')
    .setDescription('An app that is an example')
    .setVersion('1.0')
    .addOAuth2({type: 'oauth2', flows: {
      implicit: {
        scopes: {},
        authorizationUrl: `https://www.bungie.net/en/oauth/authorize?client_id=${process.env.CLIENT_ID}&response_type=code&state=${uuidv4()}`
      }
    }})
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
