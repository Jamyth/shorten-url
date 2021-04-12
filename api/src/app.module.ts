import { Module } from '@nestjs/common';
import { V1Module } from './v1/v1.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SystemModule } from './system/system.module';
import { AppController } from './app.controller';

@Module({
  imports: [ScheduleModule.forRoot(), V1Module, SystemModule],
  controllers: [AppController],
})
export class AppModule {}
