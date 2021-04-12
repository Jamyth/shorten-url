import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import * as path from 'path';

@Controller('/')
export class AppController {
  @Get('/')
  frontend(@Res() res: Response) {
    res.sendFile(path.join(__dirname, '../../web/build/dist/index.html'));
  }
}
