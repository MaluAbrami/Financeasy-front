import type { ReactNode } from "react";

type Props = {
    children : ReactNode;
}

export function MainLayout({ children }: Props) {
    return (
        <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
        <header
            style={{
            height: "60px",
            backgroundColor: "#2D2E32",
            color: "white",
            display: "flex",
            alignItems: "center",
            padding: "0 20px",
            fontSize: "18px",
            fontWeight: "bold",
            }}
        >
            Financeasy
        </header>

        <main style={{ flex: 1, padding: "20px" }}>{children}</main>
        </div>
    );
}