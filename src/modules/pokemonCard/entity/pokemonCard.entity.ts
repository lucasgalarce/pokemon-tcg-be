import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from '@nestjs/class-validator';
import { Column, Entity, ManyToOne } from 'typeorm';

import { EntityBase } from '../../../utils/entity/entity-base';
import { User } from '../../user/entity/user.entity';
import { PokemonType, PokemonExpansion, PokemonRarity } from 'src/common/enums';

@Entity()
export class PokemonCard extends EntityBase {
  @ApiProperty({ description: 'Pokemon name', type: String })
  @Column({ nullable: false })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name!: string;

  @ApiProperty({ description: 'Pokemon HP', type: Number })
  @Column({ nullable: false })
  @IsNotEmpty()
  @IsNumber()
  hp: number;

  @ApiProperty({ description: 'Pokemon Attack Damage', type: Number })
  @Column({ nullable: false })
  @IsNotEmpty()
  @IsNumber()
  originalAttackDmg: number;

  @ApiProperty({ description: 'type', enum: PokemonType })
  @IsNotEmpty()
  @IsEnum(PokemonType)
  type: PokemonType;

  @ApiProperty({ description: 'expansion', enum: PokemonExpansion })
  @IsNotEmpty()
  @IsEnum(PokemonExpansion)
  expansion: PokemonExpansion;

  @ApiProperty({ description: 'rarity', enum: PokemonRarity })
  @IsNotEmpty()
  @IsEnum(PokemonRarity)
  rarity: PokemonRarity;

  @ManyToOne(() => User, (user: User) => user.pokemonCards)
  user: User;
}
