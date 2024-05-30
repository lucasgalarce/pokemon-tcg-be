import { PokemonCard } from 'src/modules/pokemonCard/entity/pokemonCard.entity';
import { PokemonExpansion, PokemonRarity, PokemonType } from '../utils/enum/pokemon-card-enums';

export const pokemonCards: Omit<PokemonCard, 'user'>[] = [
  {
    name: 'Pikachu',
    hp: 60,
    type: PokemonType.LIGHTNING,
    expansion: PokemonExpansion.BASE,
    rarity: PokemonRarity.COMMON,
    originalAttackDmg: 20,
    weakness: PokemonType.FIGHTING,
    resistance: PokemonType.METAL,
    imageUrl:
      'https://pokemon-cards-lucas.s3.us-east-1.amazonaws.com/f774a5cd-86bc-49cd-855b-c0592f34ca52-pikachu.png',
  },
  {
    name: 'Charizard',
    hp: 180,
    type: PokemonType.FIRE,
    expansion: PokemonExpansion.BASE,
    rarity: PokemonRarity.RARE,
    originalAttackDmg: 120,
    weakness: PokemonType.WATER,
    imageUrl:
      'https://pokemon-cards-lucas.s3.us-east-1.amazonaws.com/61f0d698-a998-4267-95c4-5d7a062f3e38-charizard.png',
  },
  {
    name: 'Onix',
    hp: 90,
    type: PokemonType.FIGHTING,
    expansion: PokemonExpansion.BASE,
    rarity: PokemonRarity.COMMON,
    originalAttackDmg: 40,
    weakness: PokemonType.GRASS,
    imageUrl:
      'https://pokemon-cards-lucas.s3.us-east-1.amazonaws.com/5ffaf191-aa42-4c57-8eda-acba68a27a95-onix.png',
  },
  {
    name: 'Feraligatr',
    hp: 180,
    type: PokemonType.WATER,
    expansion: PokemonExpansion.BASE,
    rarity: PokemonRarity.RARE,
    originalAttackDmg: 160,
    weakness: PokemonType.LIGHTNING,
    imageUrl:
      'https://pokemon-cards-lucas.s3.us-east-1.amazonaws.com/0281d1c5-f031-49d2-906b-988325f871e4-feraligatr.png',
  },
  {
    name: 'Sneasel',
    hp: 70,
    type: PokemonType.DARKNESS,
    expansion: PokemonExpansion.BASE,
    rarity: PokemonRarity.UNCOMMON,
    originalAttackDmg: 20,
    weakness: PokemonType.GRASS,
    imageUrl:
      'https://pokemon-cards-lucas.s3.us-east-1.amazonaws.com/d454c715-11c6-4b9d-91d6-fe295c977b8d-sneasel.png',
  },
  {
    name: 'Scizor',
    hp: 120,
    type: PokemonType.METAL,
    expansion: PokemonExpansion.BASE,
    rarity: PokemonRarity.RARE,
    originalAttackDmg: 60,
    weakness: PokemonType.FIRE,
    resistance: PokemonType.PSYCHIC,
    imageUrl:
      'https://pokemon-cards-lucas.s3.us-east-1.amazonaws.com/e311499f-aad7-410a-aba3-fd3e96090d4d-scizor.png',
  },
  {
    name: 'Treecko',
    hp: 40,
    type: PokemonType.PSYCHIC,
    expansion: PokemonExpansion.BASE,
    rarity: PokemonRarity.COMMON,
    originalAttackDmg: 10,
    weakness: PokemonType.FIRE,
    resistance: PokemonType.WATER,
    imageUrl:
      'https://pokemon-cards-lucas.s3.us-east-1.amazonaws.com/45747ca9-f58a-4a0b-ab96-cbf5b7cc1695-trecko.png',
  },
];
