import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { https, config } from 'firebase-functions';
import { createWindow } from 'domino';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

const express = new ExpressAdapter();
const win = createWindow();

global['window'] = win;
global['document'] = win.document;

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, express);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  if (environment.production) {
    Logger.log(config().ssr);
    app.init();
  } else {
    const port = process.env.port || 3333;
    await app.listen(port, () => {
      Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
    });
  }
};

bootstrap();
export const server = https.onRequest(express.getInstance());
