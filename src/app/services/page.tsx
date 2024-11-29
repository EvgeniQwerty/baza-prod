import PageName from "@/components/PageName";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.hidden}>BAZA видеопродакшн</h1>
      <PageName imageUrl="/services/header.png" title="Услуги" text="«Мы видим ваши переживания, ваш талант и желание. Нам важно дать место, где вы максимально себя проявите. Baza - это место, где талант приобретает выражение»"/>
    </main>
  );
}
