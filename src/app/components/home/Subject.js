"use client";

import styles from "../../styles/components/Subject.module.scss";
import LinkCell from "../shared/LinkCell";
import { getBookTitles, getBooksBySubject, getBookSubjects } from "@/app/lib/utils";
import { textbooks } from "@/app/lib/data";
import { useEffect, useState } from "react";
import ChevronDownIcon from "../icons/ChevronDownIcon";

export default function Subject() {
  const [windowWidth, setWindowWidth] = useState(
    (typeof window !== "undefined" && window.innerWidth) || 375
  );
  const [initialMaxBooks, setInitialMaxBooks] = useState(5);
  const [maxBooks, setMaxBooks] = useState(initialMaxBooks);
  const bookTitles = getBookTitles(textbooks.sortBooksByTitle());
  const bookSubjects = getBookSubjects(textbooks.sortBooksByTitle())
  const [isExpanded, setIsExpanded] = useState(false);

  const breakpoint = 600;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleWindowResize = () => {
      setInitialMaxBooks(windowWidth > breakpoint ? 9 : 5);
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [windowWidth]);

  const handleShow = () => {
    setIsExpanded(!isExpanded);
    setMaxBooks((currentMaxBooks) =>
      currentMaxBooks <= initialMaxBooks ? bookTitles.length : initialMaxBooks
    );
  };

  return (
    <section className={styles.subject} id="subject">
      <h2 className={styles.subject__title}>
        Browse by <span>Subject</span>
      </h2>
      <div className={styles.subject__grid}>
        {bookSubjects.slice(0, maxBooks).map((subjectName, i) => (
          <LinkCell
            link={`/subject/${subjectName}`}
            key={i}
            text={subjectName.title()}
            variant="Secondary"
          />
        ))}
      </div>

      {bookTitles.length > initialMaxBooks && (
        <button className={styles.showMore} onClick={handleShow}>
          show {isExpanded ? "less" : "more"}
          {isExpanded ? (
            <ChevronDownIcon style={{ transform: "rotate(180deg)" }} />
          ) : (
            <ChevronDownIcon />
          )}
        </button>
      )}
    </section>
  );
}
