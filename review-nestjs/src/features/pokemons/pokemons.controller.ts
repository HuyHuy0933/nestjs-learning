import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { PokemonsService } from './pokemons.service';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

@Controller('pokemons')
export class PokemonsController {
  constructor(private readonly service: PokemonsService) {}

  // @UseInterceptors(CacheInterceptor) // Automatically cache the response for this endpoint
  // @CacheTTL(30)
  @Get('/:id')
  async getPokemon(@Param('id', ParseIntPipe) id: number): Promise<string> {
    const result = await this.service.getPokemon(id);
    return result;
  }

  @Post('/cache')
  async setCacheKey(@Query('key') key: string, @Query('value') value: string) {
    await this.service.setCacheKey(key, value);
    return {
      success: true,
      status: 201,
      message: 'Key cached successfully',
    };
  }

  @Get('/cache/:key')
  async getCacheKey(@Param('key') key: string) {
    const data = await this.service.getCacheKey(key);
    return {
      success: true,
      status: 200,
      data,
    };
  }

  @Delete('cache/:key')
  async deleteCacheKey(@Param('key') key: string) {
    await this.service.deleteCacheKey(key);
    return {
      success: true,
      status: 201,
      message: 'Key deleted successfully',
    };
  }

  @Get('cache/reset')
  async resetCache() {
    await this.service.resetCache();
    return {
      success: true,
      status: 200,
      message: 'Cache cleared successfully',
    };
  }

  @Get('store/cache')
  async cacheStore() {
    const store = await this.service.cacheStore();
    return {
      success: true,
      status: 200,
      data: store,
    };
  }
}
