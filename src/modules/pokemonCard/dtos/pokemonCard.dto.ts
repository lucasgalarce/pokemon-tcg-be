import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

import { PaginationDto, RequestPaginationDto } from '../../../utils/dtos/Pagination.dto';
import { PokemonCard } from '../entity/pokemonCard.entity';

export class PokemonCardDto extends OmitType(PokemonCard, [
  'id',
  'createdAt',
  'deletedAt',
  'updatedAt',
] as const) {}

export class UpdatePokemonCardDto extends PartialType(PokemonCardDto) {}

export class PokemonCardQueryDto extends RequestPaginationDto {
  @ApiProperty({ description: 'Name filter', required: false })
  @IsString()
  @IsOptional()
  name: string;
}

export class PokemonCardPaginationDto extends PaginationDto<PokemonCard> {
  @ApiProperty({ type: PokemonCard, isArray: true })
  data: PokemonCard[];
}
