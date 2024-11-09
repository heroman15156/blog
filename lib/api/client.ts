// import { ApiError } from '@/lib/error';
// import returnFetch, { FetchArgs, ReturnFetch, ReturnFetchDefaultOptions } from 'return-fetch';
// const errorMessages: Record<number, string> = {
//   400: '잘못된 요청입니다.',
//   401: '인증이 필요합니다.',
//   403: '접근 권한이 없습니다.',
//   404: '리소스를 찾을 수 없습니다.',
//   429: '요청이 너무 많습니다.',
//   500: '서버 오류가 발생했습니다.',
// };

// class ApiClient {
//   private readonly baseUrl: string;
//
//   constructor(baseURL: string) {
//     this.baseUrl = baseURL;
//   }
//
//   private async handleResponse<T>(response: Response): Promise<T> {
//     try {
//       const data = await response.json();
//       if (!response.ok) {
//         throw new ApiError(
//           response.status,
//           errorMessages[response.status] || '요청 처리 중 오류가 발생했습니다.',
//           data?.code
//         );
//       }
//       return data as T;
//     } catch (error) {
//       console.log('handleResponse', error);
//       if (error instanceof ApiError) throw error;
//
//       // 네트워크 에러
//       if (error instanceof TypeError && error.message === 'Failed to fetch') {
//         throw new ApiError(0, '네트워크 연결을 확인해주세요.', 'NETWORK_ERROR');
//       }
//
//       // 기타 예상치 못한 에러
//       throw new ApiError(500, '알 수 없는 오류가 발생했습니다.', 'UNKNOWN_ERROR');
//     }
//   }
//
//   async get<T>(endpoint: string): Promise<T> {
//     const response = await fetch(this.baseUrl + endpoint);
//     return this.handleResponse<T>(response);
//   }
//
//   async post<T, D = unknown>(endpoint: string, data?: D): Promise<T> {
//     const response = await fetch(this.baseUrl + endpoint, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     });
//
//     return this.handleResponse<T>(response);
//   }
//   async put<T, D = unknown>(endpoint: string, data?: D): Promise<T> {
//     const response = await fetch(this.baseUrl + endpoint, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     });
//     return this.handleResponse<T>(response);
//   }
//
//   async delete<T>(endpoint: string): Promise<T> {
//     const response = await fetch(this.baseUrl + endpoint, {
//       method: 'DELETE',
//     });
//     return this.handleResponse<T>(response);
//   }
// }

// type JsonRequestInit = Omit<NonNullable<FetchArgs[1]>, 'body'> & { body?: object };
// export type ResponseGenericBody<T> = Omit<
//   Awaited<ReturnType<typeof fetch>>,
//   keyof Body | 'clone'
// > & {
//   body: T;
// };
//
// export type JsonResponse<T> = T extends object
//   ? ResponseGenericBody<T>
//   : ResponseGenericBody<unknown>;
//
// const parseJsonSafely = (text: string): object | string => {
//   try {
//     return JSON.parse(text);
//   } catch (e) {
//     if ((e as Error).name !== 'SyntaxError') {
//       throw e;
//     }
//
//     return text.trim();
//   }
// };
// export const extendedFetch = returnFetch({
//   baseUrl: 'http://localhost:3000',
//   interceptors: {
//     request: async (args) => {
//       console.log('--------------------request--------');
//
//       return args;
//     },
//   },
// });
// const returnFetchThrowingErrorByStatusCode: ReturnFetch = (args) =>
//   returnFetch({
//     ...args,
//     interceptors: {
//       request: async (args) => {
//         console.log('-----------', args);
//         return args;
//       },
//
//       response: async (response) => {
//         if (response.status >= 400) {
//           console.log('error occured', response.status);
//           throw await response.text().then(Error);
//         }
//
//         return response;
//       },
//     },
//   });
// // Use as a replacer of `Response`
//
// export const returnFetchJson = (args?: ReturnFetchDefaultOptions) => {
//   const fetch = extendedFetch(args);
//
//   return async <T>(url: FetchArgs[0], init?: JsonRequestInit): Promise<JsonResponse<T>> => {
//     const response = await fetch(url, {
//       ...init,
//       body: init?.body && JSON.stringify(init.body),
//     });
//
//     const body = parseJsonSafely(await response.text()) as T;
//
//     return {
//       headers: response.headers,
//       ok: response.ok,
//       redirected: response.redirected,
//       status: response.status,
//       statusText: response.statusText,
//       type: response.type,
//       url: response.url,
//       body,
//     } as JsonResponse<T>;
//   };
// };
//
// const apiClient = returnFetchJson({
//   baseUrl: 'http://localhost:3000',
//   headers: { Accept: 'application/json' },
//   interceptors: {
//     request: async (args) => {
//       console.log('interceptors');
//       return args;
//     },
//     response: async (response) => {
//       console.log(response, 'response');
//       return response;
//     },
//   },
// });
//
// // const apiClient = new ApiClient(process.env.NEXT_PUBLIC_API_URL || `${window.location.origin}/api`);
// export default apiClient;
