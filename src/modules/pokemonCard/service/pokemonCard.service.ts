import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';

import { PokemonCardError } from '../enum/pokemon-card-error.enum';
import { UtilsService } from '../../../utils/services/utils.service';
import { PokemonCard } from '../entity/pokemonCard.entity';
import { PokemonCardRepository } from '../repository/pokemonCard.repository';
import { PokemonCardDto, PokemonCardQueryDto, UpdatePokemonCardDto } from '../dtos/pokemonCard.dto';
import { UserService } from '../../user/service/user.service';

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

  async createPokemonCard(pokemonCard: PokemonCardDto, userId: string) {
    const pokemonCardDb = await this.findOneByFilter({ where: [{ title: pokemonCard.title }] });
    if (pokemonCardDb) throw new ForbiddenException({ type: PokemonCardError.CARD_TITLE_EXISTS });
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new NotFoundException(`User #${userId} not found`);
    }

    const newPokemonCard = { ...pokemonCard, user };
    super.create(newPokemonCard);
    return 'PokemonCard created';
  }

  async update(id: string, pokemonCardDto: UpdatePokemonCardDto, userId: string) {
    if (!!pokemonCardDto.title && !!pokemonCardDto.description) {
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
