import type { ReactNode } from "react";

type CardProps = {
    children: ReactNode;
};

export function Card({ children }: CardProps) {
    return (
        <div
        style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
            marginBottom: "20px",
        }}
        >
        {children}
        </div>
    );
}