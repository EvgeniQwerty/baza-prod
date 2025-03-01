"use client";
import { useState, useEffect } from "react";
import styles from "./Contacts.module.css";

export default function Contacts() {
  const [showToast, setShowToast] = useState(false);
  const email = "hello@baza.red";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setShowToast(true);
    } catch (err) {
      console.error("Failed to copy email: ", err);
    }
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <section className={styles.contacts}>
      <div className={styles.contacts__header}>
        <h1 className={styles.contacts__title}>Контакты</h1>
      </div>

      <div className={styles.contacts__buttons}>
        {showToast && (
          <div className={styles.toast}>
            Электронная почта {email} скопирована в буфер обмена
          </div>
        )}

        <div className={styles.contacts__socials}>
          <button
            className={styles.contacts__button}
            onClick={copyToClipboard}
          >
            {email}
          </button>

          <button className={styles.contacts__button}>
            <a
              href="https://t.me/kalashnikovk"
              target="_blank"
              rel="noopener noreferrer"
            >
              Telegram
            </a>
          </button>
        </div>

        <button
          className={`${styles.contacts__button} ${styles.contacts__button_gray}`}
        >
          <a
            href="https://t.me/kalashnikovk"
            target="_blank"
            rel="noopener noreferrer"
          >
            Отправить портфолио
          </a>
        </button>
      </div>
    </section>
  );
}
