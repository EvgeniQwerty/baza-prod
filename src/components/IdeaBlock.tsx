import styles from "./IdeaBlock.module.css";

export default function IdeaBlock() {
    return (
        <div className={styles.ideablock}>
            <div className={styles.ideablock__text}>
                <p className={styles.ideablock__title}>Слоган</p>
                <div className={styles.ideablock__rows}>
                    <p className={styles.ideablock__row}>Мы тебя видим</p>
                </div>
            </div>
            <div className={styles.ideablock__flex}>
                <div className={styles.ideablock__left}>
                    <div className={styles.ideablock__text}>
                        <p className={styles.ideablock__title}>Цели</p>
                        <div className={styles.ideablock__rows}>
                            <p className={styles.ideablock__row}>Мы делаем BAZA<br />для себя из прошлого</p>
                            <p className={styles.ideablock__row}>Не место, а образ жизни</p>
                            <p className={styles.ideablock__row}>Люди, которые меняют</p>
                            <p className={styles.ideablock__row}>Смотрим в будущее<br />прислушиваемся к прошлому</p>
                        </div>
                    </div>

                    <div className={styles.ideablock__text}>
                        <p className={styles.ideablock__title}>Эмоции</p>
                        <div className={styles.ideablock__rows}>
                            <p className={styles.ideablock__row}>Искренность</p>
                            <p className={styles.ideablock__row}>Страсть</p>
                            <p className={styles.ideablock__row}>Драйв</p>
                            <p className={styles.ideablock__row}>Поддержка</p>
                            <p className={styles.ideablock__row}>Единство</p>
                        </div>
                    </div>
                </div>
                <div className={styles.ideablock__right}>
                    <div className={styles.ideablock__text}>
                        <p className={styles.ideablock__title}>Смыслы</p>
                        <div className={styles.ideablock__rows}>
                            <p className={styles.ideablock__row}>Комьюнити</p>
                            <p className={styles.ideablock__row}>Лидерство</p>
                            <p className={styles.ideablock__row}>Поколение</p>
                            <p className={styles.ideablock__row}>Риск</p>
                            <p className={styles.ideablock__row}>Инклюзивность</p>
                            <p className={styles.ideablock__row}>Мечты</p>
                            <p className={styles.ideablock__row}>Масштаб</p>
                            <p className={styles.ideablock__row}>Влияние</p>
                            <p className={styles.ideablock__row}>Путь</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}