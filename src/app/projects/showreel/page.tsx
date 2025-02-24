import styles from "./page.module.css";
import Project from "@/components/Project";

export default function ProjectPage() {
  return (
    <main className={styles.main}>
      <h1 className={styles.hidden}>BAZA видеопродакшн</h1>
      <Project
        vimeoLink={"https://player.vimeo.com/video/1059855333?h=02613efefe&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"}
        name={"Showreel"}
        org={"BAZA"}
        type={"Реклама"}
        year={"2023"}
        />
    </main>
  );
}
