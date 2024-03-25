import { useEffect, useRef, useState} from 'react'
import '../../assets/banner.css'
// import BannerImg from '/banner.jpg'
// import BannerVideo from '/bannerlogo.mp4'
// import BrandImageOne from '/pexels-brand-image.jpg'
// import BrandImageTwo from '/pexels-brand-image2.jpg'

import VideoSrc from '/FUNKYVERSE-2.MP4?url'

// const isSafari = () => {
//   const ua = navigator.userAgent.toLowerCase();
//   return ua.indexOf("safari") > -1 && ua.indexOf("chrome") < 0;
// };

export default function Banner(){
    
    const videoParentRef = useRef();
    const [shouldUseImage, setShouldUseImage] = useState(false);
    useEffect(() => {
        // isSafari() &&
        if ( videoParentRef.current) {
        const player = videoParentRef.current.children[0];

        if (player) {
            player.controls = false;
            player.playsinline = true;
            player.muted = true;
            player.setAttribute("muted", ""); 
            player.autoplay = true;

            setTimeout(() => {
            const promise = player.play();
            if (promise.then) {
                promise
                .then(() => {})
                .catch(() => {
                    videoParentRef.current.style.display = "none";
                    setShouldUseImage(true);
                });
            }
            }, 0);
        }
        }
    }, []);

    
    return shouldUseImage ? (
        <video
        loop
        muted
        autoPlay
        playsInline
        preload="metadata"
        >
        <source src={VideoSrc} type="video/mp4" />
        </video>
    ) : (
        <main>
            <div
            ref={videoParentRef}
            dangerouslySetInnerHTML={{
                __html: `
                <video
                loop
                muted
                autoplay
                playsinline
                preload="metadata"
                >
                <source src="${VideoSrc}" type="video/mp4" />
                </video>`
            }}
            />
        </main>
  );
}