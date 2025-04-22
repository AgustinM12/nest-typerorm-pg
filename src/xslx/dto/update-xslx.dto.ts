import { PartialType } from '@nestjs/mapped-types';
import { CreateXslxDto } from './create-xslx.dto';

export class UpdateXslxDto extends PartialType(CreateXslxDto) {}
