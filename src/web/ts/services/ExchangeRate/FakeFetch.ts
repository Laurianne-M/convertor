export class FakeFetch {
  public callCount = 0;
  public lastUrl ="";
  private response: unknown;
  private status: number;

  constructor(response: unknown, status = 200) {
    this.response = response;
    this.status = status;
  }

  fetch = async (_url: string | RequestInfo | URL ): Promise<Response> => {
    this.callCount++;
    this.lastUrl = _url.toString();
    return new Response(JSON.stringify(this.response), {
      status: this.status,
      headers: { "Content-Type": "application/json" },
  });
}
}

export class FakeErrorFetch {
  public callCount = 0;

  fetch = async (_url: string | RequestInfo | URL): Promise<Response> => {
    this.callCount++;
    throw new Error('network failure');
  }
}