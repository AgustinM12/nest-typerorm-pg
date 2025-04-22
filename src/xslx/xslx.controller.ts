import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { XslxService } from './xslx.service';
import { CreateXslxDto } from './dto/create-xslx.dto';
import { UpdateXslxDto } from './dto/update-xslx.dto';

@Controller('xslx')
export class XslxController {
  constructor(private readonly xslxService: XslxService) { }

  @Post()
  create(@Body() createXslxDto: CreateXslxDto) {
    return this.xslxService.create(createXslxDto);
  }

  @Get()
  read() {
    return this.xslxService.read();
  }

}
