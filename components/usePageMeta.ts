import { useEffect } from 'react';

const ORIGIN = 'https://www.gauravmahale.com';
const DEFAULT_TITLE = 'Gaurav Mahale — AI Product Builder';

/* Per-route <title> and canonical URL. The site is one SPA served from two
   hosts (the custom domain and the vercel.app one), so every route names
   the custom domain as canonical, and case pages stop sharing the home
   page's title in tabs and search results. */
export function usePageMeta(title: string | undefined, path: string) {
  useEffect(() => {
    document.title = title ? `${title} | Gaurav Mahale` : DEFAULT_TITLE;
    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = ORIGIN + path;
  }, [title, path]);
}
