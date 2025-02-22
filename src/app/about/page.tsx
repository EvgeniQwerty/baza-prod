import AboutHeader from "@/components/AboutHeader";
import PhotoViewBlock from "@/components/PhotoViewBlock";
import styles from "./page.module.css";
import AboutTeam from "@/components/AboutTeam";

const photos = [
  { id: 1, src: '/services/photos/1.avif', srcMobile: '/services/photos/1-mobile.avif', alt: 'Work', width: 1200, height: 800 },
  { id: 2, src: '/services/photos/2.avif', srcMobile: '/services/photos/2-mobile.avif', alt: 'Work', width: 1200, height: 800 },
  { id: 3, src: '/services/photos/3.avif', srcMobile: '/services/photos/3-mobile.avif', alt: 'Work', width: 1200, height: 800 },
  { id: 4, src: '/services/photos/4.avif', srcMobile: '/services/photos/4-mobile.avif', alt: 'Work', width: 1200, height: 800 },
];

export default function About() {
  return (
    <main className={styles.main}>
      <h1 className={styles.hidden}>BAZA видеопродакшн</h1>
      <AboutHeader/>
      <AboutTeam/>
      <PhotoViewBlock 
        photos={photos}
        videoSrc="/about/backstage.webm"
        videoSrcMobile="/about/backstage-mobile.webm"
        showMoreButton
        initialCount={4}/>
    </main>
  );
}
