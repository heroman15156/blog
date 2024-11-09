import returnFetch, { FetchArgs, ReturnFetch, ReturnFetchDefaultOptions } from 'return-fetch';
import {
  getRefreshToken,
  getSession,
  signOutAction,
  updateSessionAccessToken,
} from '@/app/actions/session-actions';
import { TokenService } from '@/lib/token-service';
import { publicPages } from '@/constant/auth';
import { returnRequestData } from '@/utils/api/apiClient';

type JsonRequestInit = Omit<NonNullable<FetchArgs[1]>, 'body'> & { body?: object };

export type ResponseGenericBody<T> = Omit<
  Awaited<ReturnType<typeof fetch>>,
  keyof Body | 'clone'
> & { body: T };

export type JsonResponse<T> = T extends object
  ? ResponseGenericBody<T>
  : ResponseGenericBody<unknown>;

const parseJsonSafely = (text: string): object | string => {
  try {
    return JSON.parse(text);
  } catch (e) {
    if ((e as Error).name !== 'SyntaxError') {
      throw e;
    }

    return text.trim();
  }
};
export const returnFetchJson = (args?: ReturnFetchDefaultOptions) => {
  const fetch = returnFetch(args);

  return async <T>(url: FetchArgs[0], init?: JsonRequestInit): Promise<JsonResponse<T>> => {
    const response = await fetch(url, {
      ...init,
      body: init?.body && JSON.stringify(init.body),
    });

    const body = parseJsonSafely(await response.text()) as T;

    return {
      headers: response.headers,
      ok: response.ok,
      redirected: response.redirected,
      status: response.status,
      statusText: response.statusText,
      type: response.type,
      url: response.url,
      body,
    } as JsonResponse<T>;
  };
};
const tokenService = TokenService.getInstance();

const returnFetchWithTokenRefresh: ReturnFetch = (args) =>
  returnFetch({
    // ⭐ return 추가
    ...args,
    interceptors: {
      response: async (response) => {
        if (response.status !== 401) {
          return response;
        }

        if (tokenService.getIsRefreshing() && args?.fetch) {
          await tokenService.addToQueue();
          const [url, config] = args?.interceptors?.request
            ? await args.interceptors?.request([response.url, {}], args.fetch)
            : [response.url, {}];
          return args.fetch(url, config);
        }
        tokenService.setIsRefreshing(true);
        try {
          const refreshClient = returnFetch({
            baseUrl: 'http://localhost:3000',
            interceptors: {
              request: async ([url, config]) => [url, { ...config, credentials: 'include' }],
            },
          });

          const refreshResponse = await refreshClient('/api/auth/refresh', {
            method: 'POST',
          });
          //
          if (!refreshResponse.ok) {
            await signOutAction();
            throw new Error('Token refresh failed');
          }

          const response = await refreshResponse.json();
          console.log(response, 'response refreshToken');

          await updateSessionAccessToken(response.accessToken);

          tokenService.executeQueue();
          if (args?.fetch) {
            const [url, config] = args?.interceptors?.request
              ? await args.interceptors.request([response.url, {}], args?.fetch)
              : [response.url, {}];

            return args.fetch(url, config);
          }
          return response;
        } catch (error) {
          await signOutAction();
          tokenService.executeQueue(error);
          throw error;
        } finally {
          tokenService.setIsRefreshing(false);
        }
      },
    },
  }); // ⭐ return 문이 필요했음

const returnFetchThrowingErrorByStatusCode: ReturnFetch = (args) =>
  returnFetch({
    ...args,

    interceptors: {
      response: async (response: Response) => {
        if (response.status >= 400 && response.status !== 401) {
          throw await response.text().then(Error);
        }

        if (response.status !== 401) {
          return response;
        }

        return response;
      },
    },
  });
export const fetchClient = returnFetchJson({
  fetch: returnFetchThrowingErrorByStatusCode({
    fetch: returnFetchWithTokenRefresh({
      fetch: returnFetch({
        baseUrl: 'http://localhost:3000',
        interceptors: {
          request: async ([url, configs]) => {
            const urlPathname = url as URL;
            const data = urlPathname.pathname;
            if (publicPages.includes(data)) {
              return [url, configs];
            }
            if (typeof window !== 'undefined') {
              const accessToken = await getSession();
              return returnRequestData({ url, configs, accessToken });
            }

            const accessToken = await getSession();
            const refreshToken = await getRefreshToken();
            return returnRequestData({ url, configs, refreshToken, isServer: true, accessToken });
          },
          response: async (response: Response) => {
            return response;
          },
        },
      }),
    }),
  }),
});
