export const HOME_PATHNAME = '/';
export const ABOUT_PATHNAME = '/about';
export const POSTS_PATHNAME = '/posts';
export const PROJECT__PATHNAME = '/project/';
export const PROJECTS_PATHNAME = '/projects';

export function isURL(url: URL | string): url is URL {
  return url instanceof URL;
}
