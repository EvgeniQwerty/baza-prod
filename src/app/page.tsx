import Image from "next/image";
import styles from "./page.module.css";
import ShowreelBlock from "@/components/ShowreelBlock";
import VideoBlock from "@/components/VideoBlock";
import IdeaBlock from "@/components/IdeaBlock";
import TeamBlock from "@/components/TeamBlock";

export default function Home() {
  return (
    <main className={styles.main}> 
    <h1 className={styles.hidden}>BAZA видеопродакшн</h1>
      <div className={styles.grid}>
        <div className={styles.grid__showreel}>
          <ShowreelBlock/>
        </div>
        <div className={styles.grid__video1}>
          <VideoBlock path="/video-1.png" name="Смена" year="2023"/>
        </div> 
        <div className={styles.grid__video2}>
          <VideoBlock path="/video-2.png" name="Суперкозлы" year="2023"/>
        </div>
        <div className={styles.grid__video3}>
          <VideoBlock path="/video-3.png" name="Servicecar" year="2023"/>
        </div>
        <div className={styles.grid__video4}>
          <VideoBlock path="/video-4.png" name="Псих" year="2023"/>
        </div>
      </div>

      <IdeaBlock/>
      <TeamBlock/>
    </main>
  );
}
