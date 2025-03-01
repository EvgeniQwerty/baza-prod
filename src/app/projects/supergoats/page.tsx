import styles from "./page.module.css";
import Project from "@/components/Project";

export default function ProjectPage() {
  return (
    <main className={styles.main}>
      <h1 className={styles.hidden}>BAZA видеопродакшн</h1>
      <Project
        vimeoLink={"https://player.vimeo.com/video/1056798263?h=47645b2617&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"}
        name={"Суперкозлы"}
        org={"Суперкозлы"}
        type={"Музыкальный клип"}
        year={"2023"}
        img1={"/projects_media/supergoats/3.avif"}
        img2={"/projects_media/supergoats/7.avif"}
        img3={"/projects_media/supergoats/5.avif"}
        img4={"/projects_media/supergoats/4.avif"}
        team={"Written & Director: Михаил Шамриков\nExecutive Producer: Роман Грузман\nScreenwriters by: Павел Чернядьев, Михаил Шамриков, Роман Грузман\nDOP — Александр Артеев\nArt-director — Анна Романова\nGaffer/1st AC — Артемий Мищихин\n2nd AC — Никита Рябенков\nLighting — Эрик Вейдерус\nLighting — Слава Шустов\nLighting — Радион Унгемах\nDrone pilot — Сергей Дудин\nArt-director assistant — Владлена Белецкая\nStylist — Татьяна Скворцова\nStylist assistant — Дарья Городилова\nMake-up artist — Екатерина Рейнсон\n2nd make-up artist — Мария Барляева\nPost Production Producer — Владислав Калашников\nEditor — Михаил Шамриков\nColor/Motion — Владислав Калашников\nCG/VFX — Мехаил Поскрёбышев\nComix artist — Валера Пюре\nSound design — Ivan Alyabev\nBest boy — Саидакмал Тулаганов\nBest boy — Андрей Карпов\nBest boy — Максим Суворов\nBest boy/Backstage — Никита Ивакин\nBackstage photo — Екатерина Лянгасова\nDriver — Евгений Петухов\nDriver — Михаил Волков\nDriver — Никита Антипенок\n"} />
    </main>
  );
}
