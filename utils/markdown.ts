import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypePrismPlus from 'rehype-prism-plus';
import rehypeStringify from 'rehype-stringify';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

const customLanguage = (language: string) => {
  const baseLanguage = language.split(':')[0];
  if (baseLanguage === 'jsx' || baseLanguage === 'tsx') {
    return 'typescript';
  }
  return baseLanguage;
};

export const markdownToHtml = async (markdown: string) => {
  const result = await remark()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .use(remarkGfm as any)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings)
    .use(rehypePrismPlus, {
      ignoreMissing: true,
      transformLanguage: customLanguage,
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown);
  return result.toString();
};
