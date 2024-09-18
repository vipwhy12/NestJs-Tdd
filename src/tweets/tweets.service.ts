import { Injectable } from '@nestjs/common';
import { errorMonitor } from 'events';

@Injectable()
export class TweetsService {
  tweets: string[] = [];

  // 1. 유효한 트윗이 생성되면, 해당 트윗을 상태에 추가해야한다.
  // 2. 유효한 트윗이 생성되면, 메서드는 해당 트윗을 반환해야합니다.
  // 3. 100자 이상의 트윗은 허용되지 않아야 합니다.
  createTweets(tweet: string) {
    if (tweet.length > 100) {
      throw new Error(`트윗이 너무 깁니다.😓`);
    }
    this.tweets.push(tweet);
    return tweet;
  }

  updateTweets(tweet: string, id: number) {
    const tweetToUpdate = this.tweets[id];
    if (!tweetToUpdate) {
      throw new Error('수정하고자 하는 트윗이 존재하지 않습니다.');
    }
    if (tweet.length > 100) {
      throw new Error(`트윗이 너무 깁니다.😓`);
    }

    this.tweets[id] = tweet;
    return this.tweets[id];
  }

  getTweets() {
    return this.tweets;
  }

  delteTweets(id: number) {
    const tweetToDelete = this.tweets[id];
    if (!tweetToDelete) {
      throw new Error(`해당 트윗은 존재하지 않습니다.`);
    }

    const delteTweets = this.tweets.slice(id, 1);
    return delteTweets;
  }
}
