import styles from "./page.module.css";
import Project from "@/components/Project";

export default function ProjectPage() {
  return (
    <main className={styles.main}>
      <h1 className={styles.hidden}>BAZA видеопродакшн</h1>
      <Project
        vimeoLink={"https://player.vimeo.com/video/1056783749?h=e826efbf2a&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"}
        name={"Первая работа"}
        org={"Кинотеатр Смена"}
        type={"HR-видео"}
        year={"2023"}
        img1={"/projects/smena/1.avif"}
        img2={"/projects/smena/2.avif"}
        img3={"/projects/smena/3.avif"}
        img4={"/projects/smena/4.avif"}
        team={"Production - BAZA\n\nDirector&DOP: Roman Milovanov\nExecutive producer: Ivan Stoletov\nExecutive producer: Egor Popel\n1AD: Alexandra Goludina\nCasting director: Darya Kolyadnaya\nStylist: Vika El'kova\nMUA: Elizabeth Tsvetkova\nVirtual Production: XO VP\nGaffer: Leonid Tashenberg\n1AC: Oleg Demkiv\nDolly: Pavel Shlyk\nAdministrator: Viktor Ermakov"} />
    </main>
  );
}
