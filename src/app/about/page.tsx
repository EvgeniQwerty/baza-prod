import AboutHeader from "@/components/AboutHeader";
import PhotoViewBlock from "@/components/PhotoViewBlock";
import styles from "./page.module.css";
import AboutTeam from "@/components/AboutTeam";

const photos = [
  { id: 1, src: '/about_media/photos/1.avif', srcMobile: '/about_media/photos/1-mobile.avif', alt: 'Work', width: 1200, height: 800 },
  { id: 2, src: '/about_media/photos/2.avif', srcMobile: '/about_media/photos/2-mobile.avif', alt: 'Work', width: 1200, height: 800 },
  { id: 3, src: '/about_media/photos/3.avif', srcMobile: '/about_media/photos/3-mobile.avif', alt: 'Work', width: 1200, height: 800 },
  { id: 4, src: '/about_media/photos/4.avif', srcMobile: '/about_media/photos/4-mobile.avif', alt: 'Work', width: 1200, height: 800 },
];

export default function About() {
  return (
    <main className={styles.main}>
      <h1 className={styles.hidden}>BAZA видеопродакшн</h1>
      <AboutHeader/>
      <AboutTeam/>
      <PhotoViewBlock 
        photos={photos}
        videoSrc="/about_media/backstage.webm"
        videoSrcMobile="/about_media/backstage-mobile.webm"
        showMoreButton
        initialCount={4}
        showServicesLink={true}/>
    </main>
  );
}
