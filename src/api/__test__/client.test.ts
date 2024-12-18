import fetchMock from 'jest-fetch-mock';
import client from '../client';

fetchMock.enableMocks();

const TEST_API_BASE_URL = 'https://bubbly-observant-trust.glitch.me';

describe('API Client', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('성공적으로 데이터를 반환해야 한다.', async () => {
    const mockResponse = {
      message: 'Success',
      data: { id: 1, name: 'Test Book' },
    };
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    const result = await client('/test-endpoint');

    expect(fetchMock).toHaveBeenCalledWith(
      `${TEST_API_BASE_URL}/test-endpoint`,
      expect.anything(),
    );
    expect(result).toEqual(mockResponse);
  });

  it('API 요청 실패 시 에러를 던져야 한다.', async () => {
    const mockErrorResponse = { message: 'Failed' };
    fetchMock.mockResponseOnce(JSON.stringify(mockErrorResponse), {
      status: 400,
    });

    await expect(client('/test-endpoint')).rejects.toThrow('Failed');
    expect(fetchMock).toHaveBeenCalledWith(
      `${TEST_API_BASE_URL}/test-endpoint`,
      expect.anything(),
    );
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
