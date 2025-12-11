import styles from "./LoginButton.module.css";

type ButtonProps = {
    label: string;
    onClick?: () => void;
    type?: "button" | "submit";
};

export function LoginButton({ label, onClick, type = "button" }: ButtonProps) {
        return (
        <button
        type={type}
        onClick={onClick}
        className={styles.button}
        >
        {label}
        </button>
    );
}