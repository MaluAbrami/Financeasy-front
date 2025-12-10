import styles from "./TableActionButton.module.css"

type TableActionButtonProps = {
  icon: React.ReactNode;
  onClick?: () => void;
  tooltip?: string;
  className?: string;
};

export function TableActionButton({ icon, onClick, tooltip, className }: TableActionButtonProps) {
  return (
    <button
      onClick={onClick}
      title={tooltip}
      className={styles.tableActionBtn ?? styles.className}
    >
      {icon}
    </button>
  );
}