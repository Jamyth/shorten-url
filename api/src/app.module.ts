import { Module } from '@nestjs/common';
import { V1Module } from './v1/v1.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot(), V1Module],
})
export class AppModule {}
