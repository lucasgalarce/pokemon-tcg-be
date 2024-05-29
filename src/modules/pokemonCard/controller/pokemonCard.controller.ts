import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { PokemonCardService } from '../service/pokemonCard.service';
import {
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PokemonCard } from '../entity/pokemonCard.entity';
import { IdParams } from '../../../utils/dtos/Commons.dto';
import {
  BattleDto,
  PokemonCardDto,
  PokemonCardPaginationDto,
  UpdatePokemonCardDto,
} from '../dtos/pokemonCard.dto';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt.guard';
import { RolesGuard } from 'src/modules/auth/guard/role.guard';
import { CurrentUser } from 'src/decorators/currentUser.decorator';
import { User } from 'src/modules/user/entity/user.entity';
@Controller('pokemon-cards')
@ApiTags('PokemonCards')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PokemonCardController {
  constructor(private service: PokemonCardService) {}

  pokemonCardService(): PokemonCardService {
    return this.service;
  }

  @Get('/')
  @ApiOkResponse({ type: PokemonCardPaginationDto })
  async findAll() {
    const pokemonCards = await this.pokemonCardService().findAll();
    return pokemonCards;
  }

  @Get('/:id')
  @ApiOkResponse({ type: PokemonCard, description: 'PokemonCard detail' })
  @ApiNotFoundResponse({ description: 'PokemonCard not found' })
  findOne(@Param() params: IdParams) {
    return this.pokemonCardService().findById(params.id);
  }

  @Post('/')
  @ApiBody({ type: PokemonCardDto, required: true })
  @ApiCreatedResponse({ description: 'PokemonCard created' })
  async save(@Body() entity: PokemonCardDto, @CurrentUser() user: User) {
    return this.pokemonCardService().createPokemonCard(entity, user);
  }

  @Delete('/:id')
  @ApiNoContentResponse({ description: 'PokemonCard deleted' })
  @ApiNotFoundResponse({ description: 'The PokemonCard you want to delete does not exist' })
  async delete(@Param() params: IdParams, @CurrentUser() user: User) {
    await this.pokemonCardService().deletePokemonCard(params.id, user.id);
  }

  @Put('/:id')
  @ApiNoContentResponse({ description: 'PokemonCard updated' })
  @ApiNotFoundResponse({ description: 'The PokemonCard you want to update does not exist' })
  async update(
    @Param() params: IdParams,
    @Body() entity: UpdatePokemonCardDto,
    @CurrentUser() user: User,
  ) {
    await this.pokemonCardService().update(params.id, entity, user.id);
  }
}
