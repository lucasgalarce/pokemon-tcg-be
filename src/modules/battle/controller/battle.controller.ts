import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiTags, ApiCreatedResponse, ApiBadRequestResponse } from '@nestjs/swagger';

import { BattleService } from '../service/battle.service';
import { BattleDto, BattleResponseDto } from '../dtos/battle.dto';

@ApiTags('Battle')
@Controller('battle')
export class BattleController {
  constructor(private readonly battleService: BattleService) {}

  @Post()
  @ApiBody({ type: BattleDto })
  @ApiCreatedResponse({ description: 'Battle result' })
  @ApiBadRequestResponse({ description: 'Invalid request' })
  async battle(@Body() battleDto: BattleDto): Promise<BattleResponseDto> {
    try {
      const result = await this.battleService.battle(battleDto);
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
