import Image from "next/image";
import styles from "./page.module.css";
import ShowreelBlock from "@/components/ShowreelBlock";
import VideosBlock from "@/components/VideosBlock";
import IdeaBlock from "@/components/IdeaBlock";
import TeamBlock from "@/components/TeamBlock";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.hidden}>BAZA видеопродакшн</h1>
      <ShowreelBlock />
      <VideosBlock />
      <IdeaBlock />
      <TeamBlock />
    </main>
  );
}
