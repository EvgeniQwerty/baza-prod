import styles from "./AboutTeam.module.css";
import Image from "next/image";

export default function AboutTeam() {
    return (
        <div className={styles.team}>
            <Image 
                            key={1}
                            src={`/about/about_team.png`} 
                            alt={`Team`} 
                            layout="fill" 
                            objectFit="cover" 
                            quality={100} 
                            className={styles.team__image}
                        />
        </div>
    );
}