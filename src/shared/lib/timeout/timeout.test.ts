import { sleep } from './timeout';

jest.spyOn(global, 'setTimeout');

describe('shared/lib/timeout/sleep', () => {
  test('Тестирование ожидания времени', async () => {
    const duration = 200;
    const startTime = Date.now();
    await sleep(duration);
    const endTime = Date.now();
    const timeDiff = endTime - startTime;

    expect(timeDiff).toBeGreaterThanOrEqual(duration);
    expect(timeDiff).toBeLessThan(duration + 100);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), duration);
  });

  test('Тестирования выполнения без ошибок', async () => {
    await expect(sleep(1000)).resolves.toBeUndefined();
  });
});
