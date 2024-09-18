import { Test, TestingModule } from '@nestjs/testing';
import { TweetsService } from './tweets.service';

describe('TweetsService', () => {
  let service: TweetsService;

  beforeEach(async () => {
    // NestJS의 내장 Test 클래스를 사용하여
    // TweetsService만을 포함하는고립된 NestJS 런타임을 생성
    const module: TestingModule = await Test.createTestingModule({
      providers: [TweetsService],
    }).compile();

    service = module.get<TweetsService>(TweetsService);
  });

  //TwweetsService가 정의 되어있는지 확인합니다.
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createTweet', () => {
    it('should create tweet', () => {
      //Arrange: 테스트 전의 설정
      service.tweets = [];
      const payload = 'This is my tweet';

      //Act: 테스트 동작 수행
      const tweet = service.createTweets(payload);

      //Assert: 예상되는 결과 선언
      expect(tweet).toBe(payload);
      expect(service.tweets).toHaveLength(1);
    });

    it('should prevent tweets created which are over 100 characters', () => {
      //Arrange: 준비단계
      const payload =
        '이것은 100자 이상의 문자열입니다. 이 문자열은 매우 길며, 트윗의 길이를 제한하는 조건을 테스트하기 위해 사용됩니다. 이 문자열은 매우 길며, 트윗의 길이를 제한하는 조건을 테스트하기 위해 사용됩니다. ';

      //Act: 실행단계
      const tweet = () => {
        return service.createTweets(payload);
      };

      //Assert: 검증단계
      expect(tweet).toThrowError();
    });
  });
});
