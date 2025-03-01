import styles from "./page.module.css";
import Project from "@/components/Project";

export default function ProjectPage() {
  return (
    <main className={styles.main}>
      <h1 className={styles.hidden}>BAZA видеопродакшн</h1>
      <Project 
      vimeoLink={"https://player.vimeo.com/video/1056778722?h=ac22c915aa&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"} 
      name={"Servicecar"} 
      org={"Servicecar"} 
      type={"Реклама на ТВ"} 
      year={"2023"} 
      img1={"/projects_media/servicecar/1.avif"}
      img2={"/projects_media/servicecar/2.avif"}
      img3={"/projects_media/servicecar/3.avif"}
      img4={"/projects_media/servicecar/4.avif"}
      team={"Продюсер - Влад Калашников\nРежиссер - Михаил Шамриков\nОператор-постановщик - Александр Артеев\nЛинейный продюсер - Дарья Огорельцева\nХудожник по гриму - Арина Михеева\nХудожник по костюмам - Дарья Огорельцева\nГаффер - Артемий Мищихин\nМонтаж - Влад Калашников, Александр Артеев\nМоушен-дизайнер/VFX - Станислав Головин\nКомпозитор/SFX - Иван Пестерников\nЦвет/Клинап - Александр Артеев\nБэкстейдж - Слава Шустов, Никита Ивакин\n"}/>
    </main>
  );
}
