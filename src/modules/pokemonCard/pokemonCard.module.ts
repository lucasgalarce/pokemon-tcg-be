import { Module } from '@nestjs/common';
import { PokemonCardController } from './controller/pokemonCard.controller';
import { PokemonCardService } from './service/pokemonCard.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokemonCard } from './entity/pokemonCard.entity';
import { PokemonCardRepository } from './repository/pokemonCard.repository';
import { UserModule } from '../user/user.module';
import { S3Module } from '../s3/s3.module';

@Module({
  imports: [TypeOrmModule.forFeature([PokemonCard]), UserModule, S3Module],
  providers: [PokemonCardService, PokemonCardRepository],
  controllers: [PokemonCardController],
  exports: [PokemonCardService],
})
export class PokemonCardModule {}
