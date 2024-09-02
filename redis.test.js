// https://node.testcontainers.org/quickstart/

import redis from 'async-redis';
import { GenericContainer } from 'testcontainers';
import { expect, describe, it, beforeAll, afterAll } from 'vitest';

describe('Redis', {timeout: 10_000_000}, () => {
  let container;
  let redisClient;

  beforeAll(async () => {
    container = await new GenericContainer('redis')
      .withExposedPorts(6379)
      .start();

    redisClient = redis.createClient(
      container.getMappedPort(6379),
      container.getHost()
    );
  });

  afterAll(async () => {
    await redisClient.quit();
    await container.stop();
  });

  it('works', async () => {
    await redisClient.set('key', 'val');
    expect(await redisClient.get('key')).toBe('val');
  });
});
