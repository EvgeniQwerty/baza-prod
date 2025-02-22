import styles from "./page.module.css";
import Project from "@/components/Project";

export default function ProjectPage() {
  return (
    <main className={styles.main}>
      <h1 className={styles.hidden}>BAZA видеопродакшн</h1>
      <Project
        vimeoLink={"https://player.vimeo.com/video/278479808?autoplay=1&loop=1&autopause=0"}
        name={"Showreel"}
        org={"BAZA"}
        type={"Реклама"}
        year={"2023"}
        />
    </main>
  );
}
