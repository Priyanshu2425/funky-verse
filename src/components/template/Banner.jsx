import { useEffect } from 'react'
import '../../assets/banner.css'
// import BannerImg from '/banner.jpg'
// import BannerVideo from '/bannerlogo.mp4'
// import BrandImageOne from '/pexels-brand-image.jpg'
// import BrandImageTwo from '/pexels-brand-image2.jpg'

import VideoSrc from '/FUNKYVERSE-2.MP4?url'

import '@vidstack/react/player/styles/base.css';
import { MediaPlayer, MediaProvider } from '@vidstack/react';

export default function Banner(){

    useEffect(()=>{
        // const videoPlayer = document.getElementById("bannerVid");
        // videoPlayer.autoPlay = "true";
        // videoPlayer.loop = "true";
        // videoPlayer.muted = "true";
    }, [])
    let i = 1;
    if(i){
        return (
            <>
                <div id="banner"> 
                    {/* <div id="banner-img-one">
                        <img src={BrandImageOne}/>
                    </div>
                    <div id="banner-img-two">
                        <img src={BrandImageTwo}/>
                    </div> */}
                    
                    <MediaPlayer load="visible" posterLoad="visible" title="Sprite Fight" src={VideoSrc} autoPlay loop>
                        <MediaProvider />
                    </MediaPlayer>
                </div>
            </>
        )
    }
    return (
        <>
            <main>
                {/* <h1> WINTER SALE </h1>
                <h2> UPTO 30% OFF </h2> */}
                {/* <span id="funky">FUNKY</span>
                <span id="verse">VERSE</span>
                <h1> WINTER SALE </h1>
                <h4> Upto 60% off</h4> */}
                {/* <video id="bannerVid">
                    <source src={BannerVideo} type="video/mp4"></source>
                    Your browser does not support the video tag.
                </video> */}
            </main>
        </>
    )
}