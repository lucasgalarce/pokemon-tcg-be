import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PokemonCardError } from '../enum/pokemon-card-error.enum';
import { UtilsService } from '../../../utils/services/utils.service';
import { PokemonCard } from '../entity/pokemonCard.entity';
import { PokemonCardRepository } from '../repository/pokemonCard.repository';
import { PokemonCardDto, PokemonCardQueryDto, UpdatePokemonCardDto } from '../dtos/pokemonCard.dto';
import { UserService } from '../../user/service/user.service';
import { User } from 'src/modules/user/entity/user.entity';
import { QueryFailedError } from 'typeorm';

@Injectable()
export class PokemonCardService extends UtilsService<PokemonCard> {
  constructor(
    @Inject(PokemonCardRepository) private readonly repository: PokemonCardRepository,
    @Inject(UserService) private readonly userService: UserService,
  ) {
    super();
  }

  protected getRepository() {
    return this.repository;
  }

  async createPokemonCard(pokemonCard: PokemonCardDto, user: User) {
    try {
      const newPokemonCard = { ...pokemonCard, user };
      super.create(newPokemonCard);
      return 'PokemonCard created';
    } catch (e) {
      if (e instanceof QueryFailedError) {
        throw new BadRequestException('Invalid enum value for rarity');
      }
      throw new BadRequestException('Failed to create PokemonCard');
    }
  }

  async update(id: string, pokemonCardDto: UpdatePokemonCardDto, userId: string) {
    if (!!pokemonCardDto.name) {
      const pokemonCardDb = await this.findOneByFilter({
        where: [{ id }],
        relations: ['user'],
      });

      if (userId !== pokemonCardDb.user.id)
        throw new ForbiddenException({ type: PokemonCardError.CARD_OWNER_DIFFERENT });
    }
    return this.updateById(id, pokemonCardDto);
  }

  public async deletePokemonCard(id: string, userId) {
    const pokemonCardDb = await this.findOneByFilter({
      where: [{ id }],
      relations: ['user'],
    });

    if (!pokemonCardDb) throw new NotFoundException(`PokemonCard with id ${id} not found`);

    if (userId !== pokemonCardDb.user.id)
      throw new ForbiddenException({ type: PokemonCardError.CARD_OWNER_DIFFERENT });

    return this.getRepository().softDelete(id);
  }

  async findWithFiltersAndPagination(payload: PokemonCardQueryDto) {
    return this.getRepository().findPokemonCardsByFiltersPaginated(payload);
  }
}
