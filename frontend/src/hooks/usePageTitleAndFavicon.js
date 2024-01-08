import { useEffect } from 'react';

const usePageTitleAndFavicon = (title, faviconUrl) => {
    useEffect(() => {
        if (title) {
            document.title = title;
        }
        if (faviconUrl) {
            let link = document.querySelector("link[rel*='icon']");
            if (!link) {
                link = document.createElement('link');
                link.rel = 'shortcut icon';
                document.head.appendChild(link);
            }
            link.type = 'image/x-icon';
            link.href = faviconUrl;
        }
    }, [title, faviconUrl]);
};

export default usePageTitleAndFavicon;
