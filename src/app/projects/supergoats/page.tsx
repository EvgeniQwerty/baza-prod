import styles from "./page.module.css";
import Project from "@/components/Project";

export default function ProjectPage() {
  return (
    <main className={styles.main}>
      <h1 className={styles.hidden}>BAZA видеопродакшн</h1>
      <Project
        vimeoLink={"https://player.vimeo.com/video/179519510"}
        name={"Суперкозлы"}
        org={"Суперкозлы"}
        type={"Музыкальный клип"}
        year={"2023"}
        img1={"/projects/supergoats/1.png"}
        img2={"/projects/supergoats/2.png"}
        img3={"/projects/supergoats/3.png"}
        img4={"/projects/supergoats/4.png"}
        backstageVimeoLink={"https://player.vimeo.com/video/179519510"}
        team={"Production - BAZA\n\nDirector&DOP: Roman Milovanov\nExecutive producer: Ivan Stoletov\nExecutive producer: Egor Popel\n1AD: Alexandra Goludina\nCasting director: Darya Kolyadnaya\nStylist: Vika El'kova\nMUA: Elizabeth Tsvetkova\nVirtual Production: XO VP\nGaffer: Leonid Tashenberg\n1AC: Oleg Demkiv\nDolly: Pavel Shlyk\nAdministrator: Viktor Ermakov"} />
    </main>
  );
}
