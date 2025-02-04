import PageName from "@/components/PageName";
import ServicesBlock from "@/components/ServicesBlock";
import PhotoViewBlock from "@/components/PhotoViewBlock";
import styles from "./page.module.css";

export default function Services() {
  return (
    <main className={styles.main}>
      <h1 className={styles.hidden}>BAZA видеопродакшн</h1>
      <PageName imageUrl="/services/header.avif" title="Услуги" text="«Мы видим ваши переживания, ваш талант и желание. Нам важно дать место, где вы максимально себя проявите. Baza - это место, где талант приобретает выражение»"/>
      <ServicesBlock/>
      <PhotoViewBlock initialCount={14}/>
    </main>
  );
}
