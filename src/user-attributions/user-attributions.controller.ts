import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserAttributionsService } from './user-attributions.service';
import { CreateUserAttributionDto } from './dto/create-user-attribution.dto';
import { UpdateUserAttributionDto } from './dto/update-user-attribution.dto';

@Controller('user-attributions')
export class UserAttributionsController {
  constructor(private readonly userAttributionsService: UserAttributionsService) {}

  @Post()
  create(@Body() createUserAttributionDto: CreateUserAttributionDto) {
    return this.userAttributionsService.create(createUserAttributionDto);
  }

  @Get()
  findAll() {
    return this.userAttributionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userAttributionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserAttributionDto: UpdateUserAttributionDto) {
    return this.userAttributionsService.update(+id, updateUserAttributionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userAttributionsService.remove(+id);
  }
}
