import styles from "./page.module.css";
import Project from "@/components/Project";

export default function ProjectPage() {
  return (
    <main className={styles.main}>
      <h1 className={styles.hidden}>BAZA видеопродакшн</h1>
      <Project
        vimeoLink={"https://player.vimeo.com/video/278479808"}
        name={"Showreel"}
        org={"BAZA"}
        type={"Реклама"}
        year={"2023"}
        img1={"/projects/showreel/1.png"}
        img2={"/projects/showreel/2.png"}
        img3={"/projects/showreel/3.png"}
        img4={"/projects/showreel/4.png"}
        backstageVimeoLink={"https://player.vimeo.com/video/278479808"}
        team={"Production - BAZA\n\nDirector&DOP: Roman Milovanov\nExecutive producer: Ivan Stoletov\nExecutive producer: Egor Popel\n1AD: Alexandra Goludina\nCasting director: Darya Kolyadnaya\nStylist: Vika El'kova\nMUA: Elizabeth Tsvetkova\nVirtual Production: XO VP\nGaffer: Leonid Tashenberg\n1AC: Oleg Demkiv\nDolly: Pavel Shlyk\nAdministrator: Viktor Ermakov"} />
    </main>
  );
}
