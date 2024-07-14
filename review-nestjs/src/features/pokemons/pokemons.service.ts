import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class PokemonsService {
  constructor(
    private readonly httpService: HttpService,

    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  async getPokemon(id: number): Promise<string> {
    // check if data is in cache:
    const cachedData = await this.cacheService.get<{ name: string }>(
      id.toString(),
    );
    if (cachedData) {
      console.log(`Getting data from cache!`);
      return `${cachedData.name}`;
    }

    // if not, call API and set the cache:
    const { data } = await this.httpService.axiosRef.get(
      `https://pokeapi.co/api/v2/pokemon/${id}`,
    );
    await this.cacheService.set(id.toString(), data, { ttl: 60 } as any);
    return `${data.name}`;
  }

  async setCacheKey(key: string, value: string): Promise<void> {
    await this.cacheService.set(key, value);
  }

  async getCacheKey(key: string): Promise<string> {
    return await this.cacheService.get(key);
  }

  async deleteCacheKey(key: string): Promise<void> {
    await this.cacheService.del(key);
  }

  async resetCache(): Promise<void> {
    await this.cacheService.reset();
  }

  async cacheStore(): Promise<string[]> {
    return await this.cacheService.store.keys();
  }
}
