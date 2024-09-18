import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class PokemonService {
  constructor(private httpService: HttpService) {}

  //1. ID가 1보다 작으면 BadRequestException을 반환한다.
  //2. ID가 151보다 크면 BadRequestException을 반환한다.
  //3. ID가 1과 151 사이일 경우 해당 포켓몬의 이름을 반환한다.
  //4. 포켓몬 API의 응답이 예상과 다를 경우 InternalServerErrorException을 반환한다.

  async getPokemon(id: number) {
    if (id < 1 || id > 151) {
      throw new BadRequestException(`Invalid Pokemon Id`);
    }

    const { data } = await this.httpService.axiosRef({
      url: `https://pokeapi.co/api/v2/pokemon/${id}`,
      method: `GET`,
    });

    if (!data || !data.species || !data.species.name) {
      throw new InternalServerErrorException();
    }

    return data.species.name;
  }
}
