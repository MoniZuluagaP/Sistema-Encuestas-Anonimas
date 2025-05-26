import { PartialType } from '@nestjs/mapped-types';
import { CreateOpcionDto } from './create-opcion.dto';

export class UpdateOpcioneDto extends PartialType(CreateOpcionDto) {}
