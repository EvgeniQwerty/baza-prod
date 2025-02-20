import styles from "./Contacts.module.css";

export default function Contacts() {
  return (
    <section className={styles.contacts}>
      <div className={styles.contacts__header}>
        <h1 className={styles.contacts__title}>Контакты</h1>
      </div>

      <div className={styles.contacts__buttons}>
        <div className={styles.contacts__socials}>
          <button className={styles.contacts__button}><a
            href="mailto:hello@baza.red"
            target="_blank"
            rel="noopener noreferrer"
          >Почта</a></button>
          <button className={styles.contacts__button}><a
            href="https://t.me/kalashnikovk"
            target="_blank"
            rel="noopener noreferrer"
          >Telegram</a></button>
        </div>
        <button className={`${styles.contacts__button} ${styles.contacts__button_gray}`}><a
          href="https://t.me/kalashnikovk"
          target="_blank"
          rel="noopener noreferrer"
        >Отправить портфолио</a></button>
      </div>
    </section>
  )
}