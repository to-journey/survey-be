import { PartialType } from '@nestjs/mapped-types';
import { CreateUserAttributionDto } from './create-user-attribution.dto';

export class UpdateUserAttributionDto extends PartialType(CreateUserAttributionDto) {}
