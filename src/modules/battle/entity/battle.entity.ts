import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { PokemonCard } from 'src/modules/pokemonCard/entity/pokemonCard.entity';

@Entity()
export class Battle {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ type: String })
  id: string;

  @ManyToOne(() => PokemonCard, { nullable: false })
  @ApiProperty({ type: PokemonCard })
  card: PokemonCard;

  @ManyToOne(() => PokemonCard, { nullable: false })
  @ApiProperty({ type: PokemonCard })
  attackTo: PokemonCard;

  @Column({ type: 'int', nullable: false })
  @ApiProperty({ type: Number })
  originalAttack: number;

  @Column({ type: 'int', nullable: false })
  @ApiProperty({ type: Number })
  attackModified: number;

  @Column({ type: 'boolean', nullable: false })
  @ApiProperty({ type: Boolean })
  succeed: boolean;
}
