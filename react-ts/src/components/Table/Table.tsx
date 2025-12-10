import styles from "./Table.module.css"

type Column = {
    label: string;
    key: string;
};

type TableProps = {
    columns: Column[];
    data: any[];
};

export function Table({ columns, data }: TableProps) {
    return (
        <table
        >
            <thead>
                <tr>
                {columns.map((col) => (
                    <th
                    key={col.key}
                    >
                    {col.label}
                    </th>
                ))}
                </tr>
            </thead>

            <tbody>
                {data.length === 0 && (
                <tr>
                    <td colSpan={columns.length}>
                    Nenhum registro encontrado.
                    </td>
                </tr>
                )}

                {data.map((row: any, index: number) => (
                <tr key={index}>
                    {columns.map((col) => (
                    <td key={col.key} className={col.key === "actions" ? styles.actionsCell : ""}>
                        {row[col.key]}
                    </td>
                    ))}
                </tr>
                ))}
            </tbody>
        </table> 
    );
}