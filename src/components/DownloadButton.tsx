import React, { FC, useCallback } from 'react';
import DownloadIcon from 'public/svg/Download.svg';

export const DownloadButton: FC<{url?: string}> = ({url}) => {
    const download = useCallback(async () => {
        if (!url) return;
        fetch(url)
            .then(response => {

                response.blob().then(blob => {
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'DegenCard.png';
                    a.click();
                });
                //window.location.href = response.url;
            });
    }, [url])

    return <button onClick={download} className="bg-transparent flex items-center gap-4 w-fit download-icon">
        <DownloadIcon/>
        <span className="text-white font-bold text-lg">Download card image</span>
    </button>
}
