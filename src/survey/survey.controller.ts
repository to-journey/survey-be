import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { Role } from 'src/user/enums/role.enum';
import { Roles, RolesGuard } from 'src/guards';
import { RequestWithUser } from 'src/types';

@Controller('survey')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  create(@Body() createSurveyDto: CreateSurveyDto) {
    return this.surveyService.create(createSurveyDto);
  }

  @UseGuards(RolesGuard)
  @Get()
  findAll(@Req() request: RequestWithUser) {
    return this.surveyService.findAll(request.user);
  }

  @UseGuards(RolesGuard)
  @Get(':id')
  findOne(@Req() request: RequestWithUser, @Param('id') id: string) {
    return this.surveyService.findOne(request.user, +id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSurveyDto: UpdateSurveyDto) {
    return this.surveyService.update(+id, updateSurveyDto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.surveyService.remove(+id);
  }
}
