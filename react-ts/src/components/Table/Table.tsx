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
        style={{
            width: "100%",
            borderCollapse: "collapse",
            backgroundColor: "white",
            borderRadius: "8px",
            overflow: "hidden",
        }}
        >
            <thead>
                <tr>
                {columns.map((col) => (
                    <th
                    key={col.key}
                    style={{
                        textAlign: "left",
                        padding: "12px",
                        backgroundColor: "#2D2E32",
                        color: "white",
                        fontWeight: "600",
                    }}
                    >
                    {col.label}
                    </th>
                ))}
                </tr>
            </thead>

            <tbody>
                {data.length === 0 && (
                <tr>
                    <td colSpan={columns.length} style={{ padding: "12px" }}>
                    Nenhum registro encontrado.
                    </td>
                </tr>
                )}

                {data.map((row: any, index: number) => (
                <tr key={index} style={{ borderBottom: "1px solid #eee" }}>
                    {columns.map((col) => (
                    <td key={col.key} style={{ padding: "12px" }}>
                        {row[col.key]}
                    </td>
                    ))}
                </tr>
                ))}
            </tbody>
        </table> 
    );
}