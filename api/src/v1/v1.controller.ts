import { Controller, Res, Req } from '@nestjs/common';
import { V1Service } from './v1.service';
import { Get, Post, ReturnType, Param, Body } from 'nest-api-generator';
import { CreateShortenURLAJAXRequest } from './type';
import { Response, Request } from 'express';

@Controller('v1')
export class V1Controller {
  constructor(private readonly v1Service: V1Service) {}

  @Get('/:hash')
  @ReturnType()
  getHash(@Param('hash') hash: string, @Res() response: Response) {
    const url = this.v1Service.extractURL(hash);
    response.redirect(url);
  }

  @Post('/')
  @ReturnType(String)
  createShortURL(
    @Body() request: CreateShortenURLAJAXRequest,
    @Req() req: Request,
  ) {
    const hash = this.v1Service.hash(request);
    return `${req.protocol}://${req.get('host')}/v1/${hash}`;
  }
}
