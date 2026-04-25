export class FakeFetch {
  public callCount = 0;
  private response: unknown;

  constructor(response: unknown) {
    this.response = response;
  }

  fetch = async (_url: string): Promise<Response> => {
    this.callCount++;
    return {
      json: async () => this.response
    } as Response;
  }
}

export class FakeErrorFetch {
  public callCount = 0;

  fetch = async (_url: string): Promise<Response> => {
    this.callCount++;
    throw new Error('network failure');
  }
}