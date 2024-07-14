import { Module } from '@nestjs/common';
import { PokemonsController } from './pokemons.controller';
import { PokemonsService } from './pokemons.service';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    HttpModule,
  ],
  controllers: [PokemonsController],
  providers: [PokemonsService],
})
export class PokemonsModule {}
