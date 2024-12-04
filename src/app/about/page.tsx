import AboutHeader from "@/components/AboutHeader";
import PhotoViewBlock from "@/components/PhotoViewBlock";
import styles from "./page.module.css";
import AboutTeam from "@/components/AboutTeam";

export default function About() {
  return (
    <main className={styles.main}>
      <h1 className={styles.hidden}>BAZA видеопродакшн</h1>
      <AboutHeader/>
      <AboutTeam/>
      <PhotoViewBlock initialCount={14}/>
    </main>
  );
}
