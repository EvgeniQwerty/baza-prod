import styles from "./page.module.css";
import Project from "@/components/Project";

export default function ProjectPage() {
  return (
    <main className={styles.main}>
      <h1 className={styles.hidden}>BAZA видеопродакшн</h1>
      <Project
        vimeoLink={"https://player.vimeo.com/video/1056777302?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"}
        name={"Псих"}
        org={"Бренд одежды"}
        type={"Fashion-ролик"}
        year={"2023"}
        img1={"/projects/psycho/1.avif"}
        img2={"/projects/psycho/2.avif"}
        img3={"/projects/psycho/3.avif"}
        img4={"/projects/psycho/4.avif"}
        team={"DIRECTED by Mikhail Shamrikov\nPRODUCED by Vladislav Kalashnikov\nART DIRECTION by Anna Romanova\nLine producer: Daria Ogoreltseva\nDirector of Photography: Vladislav Kalashnikov\nStyle by ПСИХ\nGaffer: Vladislav Kalashnikov\nMusic by dotbeats\nEdit: Mikhail Shamrikov\nTitles: Mikhail Shamrikov, Anna Romanova\nColor/VFX: Vladislav Kalashnikov\nMODEL: Artem Moshkin, Liza Smirnova\n"} />
    </main>
  );
}
