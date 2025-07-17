type RequestOptions = import('ofetch').FetchOptions<'json', any>;

type RequestParams<Params = undefined> = Params extends undefined
  ? { options?: RequestOptions }
  : { options?: RequestOptions } & Params;
