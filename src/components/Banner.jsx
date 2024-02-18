import { useEffect } from 'react'
import '../assets/banner.css'
import BannerImg from '/banner.jpg'
import BannerVideo from '/bannerlogo.mp4'

export default function Banner(){

    function closeMenu(){
        let openUpMenu = document.getElementById('openup-menu');
        openUpMenu.style.display = 'none';
        let body = document.getElementsByTagName('body');
        body[0].style.overflow = "scroll";
    }

    useEffect(()=>{
        const videoPlayer = document.getElementById("bannerVid").autoPlay();
        videoPlayer.autoPlay();
        videoPlayer.loop();
        videoPlayer.muted();
        closeMenu();
    }, [])

    return (
        <>
            <main>
                {/* <h1> WINTER SALE </h1>
                <h2> UPTO 30% OFF </h2> */}
                {/* <span id="funky">FUNKY</span>
                <span id="verse">VERSE</span>
                <h1> WINTER SALE </h1>
                <h4> Upto 60% off</h4> */}
                <video id="bannerVid">
                    <source src={BannerVideo} type="video/mp4"></source>
                    Your browser does not support the video tag.
                </video>
            </main>
        </>
    )
}