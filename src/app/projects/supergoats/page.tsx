import styles from "./page.module.css";
import Project from "@/components/Project";
import videosData from "@/videosData";

export default function ProjectPage() {
  let projectName = "Суперкозлы";

  let data = videosData.find(item => item.name.toLowerCase() === projectName.toLowerCase());

  if (!data) {
    return <></>
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.hidden}>BAZA видеопродакшн</h1>
      <Project
        vimeoLink={data.vimeoLink}
        name={data.name}
        org={data.org}
        type={data.type}
        year={data.year}
        img1={data.img1}
        img2={data.img2}
        img3={data.img3}
        img4={data.img4}
        team={data.team} />
    </main>
  );
}
