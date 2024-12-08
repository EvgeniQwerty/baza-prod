import styles from "./AboutTeam.module.css";
import Image from "next/image";

// Данные о команде
const teamData = [
    { position: "Продюсер", names: ["Калашников Владислав"], span: 6 },
    { position: "Режиссер", names: ["Шамриков Михаил"], span: 6 },
    { position: "Сценаристы", names: ["Шамриков Михаил", "Романова Анна"], span: 6 },
    { position: "Оператор-постановщик", names: ["Артеев Александр"], span: 6 },
    { position: "Линейные продюсеры", names: ["Огорельцева Дарья", "Калашников Владислав"], span: 6 },
    { position: "", names: [""], span: 1 },
    { position: "В главных ролях", names: ["Пономарева София", "Гусев Александр", "Малых Илья"], span: 1 },
    { position: "", names: [""], span: 6 },
    { position: "", names: [""], span: 6 },
    { position: "", names: [""], span: 6 },
    { position: "", names: [""], span: 6 },
    { position: "", names: [""], span: 6 },
    { position: "Помощник продюсера", names: ["Игнатьева Алена"], span: 6 },
    { position: "Директор по кастингу", names: ["Огорельцева Дарья", "Шамриков Михаил"], span: 6 },
    { position: "Ассистент режиссера", names: ["Огорельцева Дарья"], span: 6 },
    { position: "Арт директор", names: ["Романова Анна"], span: 6 },
    { position: "Мастер по реквизиту", names: ["Огорельцева Дарья"], span: 6 },
    { position: "", names: [""], span: 1 },
    { position: "Роли второго плана", names: ["Демаков Алексей", "Саввина Елена", "Free Man Александр", "Дягилев Денис"], span: 1 },
    { position: "Ассистент мастера по реквизиту", names: ["Игнатьева Алена"], span: 5 },
    { position: "Фокус пуллер", names: ["???"], span: 5 },
    { position: "Гафферы", names: ["???"], span: 5 },
    { position: "Бестбои", names: ["???"], span: 5 },
    { position: "Художник по костюмам", names: ["Марьинская Дарья"], span: 5 },
    { position: "Грим", names: ["Рейнсон Екатерина"], span: 5 },
    { position: "Координатор", names: ["Огорельцева Дарья"], span: 5 },
    { position: "CG", names: ["Коршунов Павел", "Белов Дмитрий"], span: 5 },
    { position: "Режиссер монтажа", names: ["Артеев Александр"], span: 5 },
    { position: "Саунд дизайнер", names: ["???"], span: 5 },
    { position: "Композиторы", names: ["???"], span: 5 },
    { position: "Backstage", names: ["Илья Урс"], span: 5 },
];

export default function AboutTeam() {
    return (
        <div className={styles.team}>
            <div className={styles.team__grid}>
                {teamData.map((member, index) => (
                    <div key={index} className={`${styles[`grid__span${member.span}`]}`}>
                        <p className={styles.grid__position}>{member.position}</p>
                        {member.names.map((name, nameIndex) => (
                            <p key={nameIndex} className={styles.grid__name}>
                                {name}
                            </p>
                        ))}
                    </div>
                ))}
            </div>
            <Image
                src="/about/about_team.png"
                alt="Team"
                layout="fill"
                objectFit="cover"
                quality={100}
                className={styles.team__image}
            />
        </div>
    );
}