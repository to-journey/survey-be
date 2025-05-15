import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/guards/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { Role } from 'src/user/enums/role.enum';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { SettingService } from './setting.service';

@Controller('setting')
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  create(@Body() createSettingDto: CreateSettingDto) {
    return this.settingService.create(createSettingDto);
  }

  @Get()
  findAll() {
    return this.settingService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.settingService.findOne(name);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Patch(':name')
  update(@Param('name') name: string, @Body() updateSettingDto: UpdateSettingDto) {
    return this.settingService.update(name, updateSettingDto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.settingService.remove(name);
  }
}
