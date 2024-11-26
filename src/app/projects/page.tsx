import PageName from "@/components/PageName";
import styles from "./page.module.css";
import VideosBlock from "@/components/VideosBlock";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.hidden}>BAZA видеопродакшн</h1>
      <PageName imageUrl="/projects/header.png" title="Проекты"/>
      <VideosBlock displayCount={8} />
    </main>
  );
}
