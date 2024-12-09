// components/Project.tsx
import React from 'react';
import styles from "./Project.module.css";
import Image from 'next/image';

interface ProjectProps {
    vimeoLink: string;
    name: string;
    org: string;
    type: string;
    year: string;
    img1: string;
    img2: string;
    img3: string;
    img4: string;
    backstageVimeoLink: string;
    team: string;
}

const Project: React.FC<ProjectProps> = ({ vimeoLink, name, org, type, year, img1, img2, img3, img4, backstageVimeoLink, team }) => {
    return (
        <div className={styles.project}>
            <div className={styles.project__header}>
                <div className={styles.project__hleft}>
                    <h2 className={styles.project__name}>{name}<span className={styles.project__year}>{year}</span></h2>
                </div>
                <div className={styles.project__hright}>
                    <h3 className={styles.project__org}>{org}</h3>
                    <h4 className={styles.project__type}>{type}</h4>
                </div>
            </div>

            <div className={styles.video__container}>
                <iframe
                    src={vimeoLink}
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    title="Vimeo Video"
                ></iframe>
            </div>

            <div className={styles.project__lowwrapper}>
                <div className={styles.project__lowleft}>
                    <h2 className={styles.project__title}>Как это было</h2>
                    <div className={styles.project__photos}>
                        <Image src={img1} alt="Как это было 1" className={styles.project__img} width={600} height={400} />
                        <Image src={img2} alt="Как это было 2" className={styles.project__img} width={600} height={400} />
                        <Image src={img3} alt="Как это было 3" className={styles.project__img} width={600} height={400} />
                        <Image src={img4} alt="Как это было 4" className={styles.project__img} width={600} height={400} />
                        <div className={styles.project__backstagevideo}>
                            <iframe
                                src={backstageVimeoLink}
                                allow="autoplay; fullscreen; picture-in-picture"
                                allowFullScreen
                                title="Backstage Video"
                            ></iframe>
                        </div>
                    </div>
                </div>
                <div className={styles.project__lowright}>
                    <h2 className={styles.project__title}>Команда проекта</h2>
                    {team.split("\n").map((line, index) => (
                            <p key={index} className={styles.team__line}>
                                {line}
                            </p>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Project;