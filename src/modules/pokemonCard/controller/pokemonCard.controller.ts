import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PokemonCardService } from '../service/pokemonCard.service';
import { ApiOkResponse, ApiNotFoundResponse, ApiNoContentResponse, ApiTags } from '@nestjs/swagger';
import { PokemonCard } from '../entity/pokemonCard.entity';
import { IdParams } from '../../../utils/dtos/Commons.dto';
import {
  PokemonCardDto,
  PokemonCardPaginationDto,
  PokemonCardQueryDto,
  UpdatePokemonCardDto,
} from '../dtos/pokemonCard.dto';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt.guard';
import { RolesGuard } from 'src/modules/auth/guard/role.guard';
import { CurrentUser } from 'src/decorators/currentUser.decorator';
import { User } from 'src/modules/user/entity/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from 'src/modules/s3/service/s3.service';

@Controller('pokemon-cards')
@ApiTags('PokemonCards')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PokemonCardController {
  constructor(
    private readonly service: PokemonCardService,
    private readonly s3Service: S3Service,
  ) {}

  pokemonCardService(): PokemonCardService {
    return this.service;
  }

  @Get('/')
  @ApiOkResponse({ type: PokemonCardPaginationDto })
  async findAll(@Query() queryDto: PokemonCardQueryDto) {
    const pokemonCards = await this.pokemonCardService().findWithFiltersAndPagination(queryDto);
    return pokemonCards;
  }

  @Get('/:id')
  @ApiOkResponse({ type: PokemonCard, description: 'PokemonCard detail' })
  @ApiNotFoundResponse({ description: 'PokemonCard not found' })
  findOne(@Param() params: IdParams) {
    return this.pokemonCardService().findById(params.id);
  }

  @Post('/')
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createPokemonDto: PokemonCardDto,
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: User,
  ) {
    if (file) {
      const imageUrl = await this.s3Service.uploadFile(file);
      createPokemonDto.imageUrl = imageUrl;
    } else {
      const defaultImage =
        'https://pokemon-cards-lucas.s3.us-east-1.amazonaws.com/cbf16e85-06d5-46d4-88af-950ba9a25336-whois.png';
      createPokemonDto.imageUrl = defaultImage;
    }
    return this.pokemonCardService().createPokemonCard(createPokemonDto, user);
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
