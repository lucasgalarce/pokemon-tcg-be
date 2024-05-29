import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString, MaxLength } from '@nestjs/class-validator';
import { Column, Entity, ManyToOne } from 'typeorm';

import { EntityBase } from '../../../utils/entity/entity-base';
import { User } from '../../user/entity/user.entity';
import { PokemonType, PokemonExpansion, PokemonRarity } from 'src/utils/enum/pokemon-card-enums';

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
  @Column({ type: 'enum', enum: PokemonType, nullable: false })
  @IsNotEmpty()
  @IsEnum(PokemonType)
  type: PokemonType;

  @ApiProperty({ description: 'expansion', enum: PokemonExpansion })
  @Column({ type: 'enum', enum: PokemonExpansion, nullable: false })
  @IsNotEmpty()
  @IsEnum(PokemonExpansion)
  expansion: PokemonExpansion;

  @ApiProperty({ description: 'rarity', enum: PokemonRarity })
  @Column({ type: 'enum', enum: PokemonRarity, nullable: false })
  @IsNotEmpty()
  @IsEnum(PokemonRarity)
  rarity: PokemonRarity;

  @ApiProperty({ description: 'weakness', enum: PokemonType })
  @Column({ type: 'enum', enum: PokemonType, nullable: false })
  @IsNotEmpty()
  @IsEnum(PokemonType)
  weakness: PokemonType;

  @ApiProperty({ description: 'resistance', enum: PokemonType })
  @Column({ type: 'enum', enum: PokemonType, nullable: true })
  @IsNotEmpty()
  @IsEnum(PokemonType)
  resistance?: PokemonType;

  @ManyToOne(() => User, (user: User) => user.pokemonCards)
  user: User;
}
