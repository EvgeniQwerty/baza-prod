import styles from "./page.module.css";
import Project from "@/components/Project";

export default function ProjectPage() {
  return (
    <main className={styles.main}>
      <h1 className={styles.hidden}>BAZA видеопродакшн</h1>
      <Project
        vimeoLink={"https://kinescope.io/embed/0dQrnJYmPeu59G5aMX9dp1"}
        name={"Псих"}
        org={"Бренд одежды"}
        type={"Fashion-ролик"}
        year={"2023"}
        img1={"/projects/psycho/1.avif"}
        img2={"/projects/psycho/2.avif"}
        img3={"/projects/psycho/3.avif"}
        img4={"/projects/psycho/4.avif"}
        backstageVimeoLink={"https://kinescope.io/embed/0dQrnJYmPeu59G5aMX9dp1"}
        team={"Production - BAZA\n\nDirector&DOP: Roman Milovanov\nExecutive producer: Ivan Stoletov\nExecutive producer: Egor Popel\n1AD: Alexandra Goludina\nCasting director: Darya Kolyadnaya\nStylist: Vika El'kova\nMUA: Elizabeth Tsvetkova\nVirtual Production: XO VP\nGaffer: Leonid Tashenberg\n1AC: Oleg Demkiv\nDolly: Pavel Shlyk\nAdministrator: Viktor Ermakov"} />
    </main>
  );
}
