import { Controller, Get } from '@nestjs/common';
import { NestAPIGenerator } from 'nest-api-generator';
import { AppModule } from '../app.module';
import * as path from 'path';

@Controller('system')
export class SystemController {
  private readonly generator = new NestAPIGenerator({
    appModule: AppModule,
    rootDirectory: path.join(__dirname, '../../'),
    useReturn: true,
  });
  @Get('/_api')
  async generateAPI() {
    const content = JSON.stringify(this.generator.run());
    return JSON.parse(content);
  }
}
