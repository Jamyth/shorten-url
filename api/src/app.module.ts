import { Module } from '@nestjs/common';
import { V1Module } from './v1/v1.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SystemModule } from './system/system.module';

@Module({
  imports: [ScheduleModule.forRoot(), V1Module, SystemModule],
})
export class AppModule {}
