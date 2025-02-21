import PageName from "@/components/PageName";
import ServicesBlock from "@/components/ServicesBlock";
import PhotoViewBlock from "@/components/PhotoViewBlock";
import styles from "./page.module.css";

export default function Services() {
  return (
    <main className={styles.main}>
      <h1 className={styles.hidden}>BAZA видеопродакшн</h1>
      <PageName imageUrl="/services/header.avif" title="Услуги"/>
      <ServicesBlock/>
      <PhotoViewBlock initialCount={14}/>
    </main>
  );
}
