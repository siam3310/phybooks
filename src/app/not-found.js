export default function NotFound() {
  return (
    <div
      className="error"
      style={{
        fontFamily: 'system-ui, "Segoe UI", Roboto, Helvetica, sans-serif',
        height: "100vh",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        background: "#000",
      }}
    >
      <div style={{ display: "flex" }}>
        <h1
          style={{
            display: "inlineBlock",
            margin: "0px 20px 0px 0px",
            padding: "0px 23px 0px 0px",
            fontSize: "24px",
            fontWeight: 500,
            verticalAlign: "top",
            lineHeight: "49px",
            borderRight: "1px solid rgba(255, 255, 255, 0.3)",
          }}
        >
          404
        </h1>
        <div style={{ display: "inlineBlock" }}>
          <h2
            style={{
              fontSize: "14px",
              fontWeight: "400",
              lineHeight: "49px",
              margin: "0px",
            }}
          >
            This page could not be found.
          </h2>
        </div>
      </div>
    </div>
  );
}
