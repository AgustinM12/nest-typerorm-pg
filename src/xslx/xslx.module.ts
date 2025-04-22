import { Module } from '@nestjs/common';
import { XslxService } from './xslx.service';
import { XslxController } from './xslx.controller';

@Module({
  controllers: [XslxController],
  providers: [XslxService],
})
export class XslxModule {}
