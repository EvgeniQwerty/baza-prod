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
        img1={"/projects_media/smena/1.avif"}
        img2={"/projects_media/smena/2.avif"}
        img3={"/projects_media/smena/3.avif"}
        img4={"/projects_media/smena/4.avif"}
        team={"Продюсер - Влад Калашников\nОператор-постановщик - Александр Артеев\nХудожник по гриму - Алена Игнатьева\nХудожник по костюмам - Дарья Огорельцева, Елизавета Балуева\nГаффер - Артемий Мищихин\nОсветитель - Иван Бабинцев\nМонтаж - Влад Калашников, Александр Артеев\nКомпозитор/SFX - Лев Лерум\nЦвет/Клинап - Александр Артеев\nБэкстейдж фото - Илья Урс\n"} />
    </main>
  );
}
