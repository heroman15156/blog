import { REFRESH_TOKEN_COOKIE_NAME } from '@/constant/auth';

type Data = {
  url: string | URL;
  configs: RequestInit | undefined;
  isServer?: boolean;
  accessToken?: string;
  refreshToken?: string;
};

export const returnRequestData = ({
  url,
  configs,
  isServer = false,
  accessToken,
  refreshToken,
}: Data): [string | URL, RequestInit | undefined] => {
  if (isServer && refreshToken) {
    return [
      url,
      {
        ...configs,
        credentials: 'include',
        headers: {
          ...configs?.headers,
          Cookie: `${REFRESH_TOKEN_COOKIE_NAME}=${refreshToken}`,
          Authorization: `Bearer ${accessToken}`,
        },
      },
    ];
  }

  if (!isServer && accessToken) {
    return [
      url,
      {
        ...configs,
        credentials: 'include',
        headers: {
          ...configs?.headers,
          Authorization: `Bearer ${accessToken}`,
        },
      },
    ];
  }
  return [url, configs];
};
