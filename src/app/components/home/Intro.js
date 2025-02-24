import React from "react";
import Button from "../shared/Button";
import styles from "../../styles/components/Intro.module.scss";

export default function Intro() {
  return (
    <section className={styles.intro}>
      <h1 className={styles.intro__title}>
        <span className={styles.intro__titlePart1} data-content="Explore.">
          <span className={styles.intro__titleText1}>Explore.</span>
        </span>
        <span className={styles.intro__titlePart2} data-content="Read.">
          <span className={styles.intro__titleText2}>Read.</span>
        </span>
        <span className={styles.intro__titlePart3} data-content="Learn.">
          <span className={styles.intro__titleText3}>Learn.</span>
        </span>
      </h1>

      <p className={styles.intro__description}>
        Download and Read Bangla Books, Novels etc For FREE !!!.
      </p>

      <div className={styles.intro__btnGroup}>
        <Button
          btnText="Browse by subject"
          btnType="primary"
          btnLink="#subject"
        />
        <Button
          btnText="Browse by semester"
          btnType="secondary"
          btnLink="#semester"
          glow={true}
        />
      </div>
    </section>
  );
}
