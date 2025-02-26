"use client";
import { useState } from "react";
import styles from "../styles/components/Button.module.scss";

export default function Lyrics() {
  const [show, setShow] = useState(true);

  return (
    <div style={{ fontSize: "10.5pt" }}>
      <div hidden={show}>
        <br />
        ആരാധികേ...
        <br />
        മഞ്ഞുതിരും വഴിയരികേ
        <br />
        നാളേറെയായ്
        <br />
        കാത്തുനിന്നു മിഴി നിറയേ
        <br />
        <br />
        നീയെങ്ങു പോകിലും
        <br />
        അകലേക്ക് മായിലും <br />
        എന്നാശകൾ തൻ മൺതോണിയുമായ്
        <br />
        തുഴഞ്ഞരികെ ഞാൻ വരാം
        <br />
        <br />
        എന്റെ നെഞ്ചാകെ നീയല്ലേ
        <br />
        എന്റെ ഉന്മാദം നീയല്ലേ
        <br />
        നിന്നെ അറിയാൻ
        <br />
        ഉള്ളു നിറയാൻ
        <br />
        ഒഴുകിയൊഴുകി ഞാൻ <br />
        ഇന്നുമെന്നുമൊരു പുഴയായ് <br />
        ആരാധികേ...
        <br />
        <br />
      </div>
      <button
        className={`${styles.btn} ${styles.secondary}`}
        onClick={() => setShow(!show)}
      >
        {show ? "Show": "Hide"} Lyrics
      </button>
    </div>
  );
}
