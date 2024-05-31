import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';

import { PokemonCard } from '../entity/pokemonCard.entity';
import { PaginationDto } from '../../../utils/dtos/Pagination.dto';
import { PokemonCardQueryDto } from '../dtos/pokemonCard.dto';

@Injectable()
export class PokemonCardRepository extends Repository<PokemonCard> {
  constructor(@InjectRepository(PokemonCard) private readonly _: Repository<PokemonCard>) {
    super(_.target, _.manager, _.queryRunner);
  }

  async findPokemonCardsByFiltersPaginated(payload: PokemonCardQueryDto, userId: string) {
    const { page, pageSize, name, type, expansion } = payload;

    const pageNumber = page ?? 0;
    const take = pageSize ?? 8;
    const skip = Math.max(0, pageNumber) * take;

    const query = this.createQueryBuilder('pokemonCard');
    query.andWhere('pokemonCard.userId = :userId', { userId });

    if (name) {
      query.andWhere(
        new Brackets((qb) => {
          qb.where('UPPER(pokemonCard.name) LIKE UPPER(:name)', { name: `%${name}%` });
        }),
      );
    }

    if (type) {
      query.andWhere('pokemonCard.type = :type', { type });
    }

    if (expansion) {
      query.andWhere('pokemonCard.expansion = :expansion', { expansion });
    }

    query.orderBy('pokemonCard.name', 'ASC');

    const [data, total] = await query.take(take).skip(skip).getManyAndCount();

    return new PaginationDto({
      data,
      page,
      pageSize: take,
      lastPage: total ? Math.ceil(total / take) - 1 : 0,
      total,
    });
  }
}
