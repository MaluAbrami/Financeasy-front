type ButtonProps = {
    label: string;
    onClick?: () => void;
    type?: "button" | "submit";
};

export function Button({ label, onClick, type = "button" }: ButtonProps) {
        return (
        <button
        type={type}
        onClick={onClick}
        style={{
            backgroundColor: "#2D2E32",
            color: "white",
            padding: "10px 16px",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            fontSize: "15px",
            fontWeight: "500",
        }}
        >
        {label}
        </button>
    );
}