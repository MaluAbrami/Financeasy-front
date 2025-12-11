import { MainLayout } from "../layout/MainLayout";
import { Card } from "../components/Card/Card";
import { Button } from "../components/Button/Button";
import { Table } from "../components/Table/Table";
import { Link } from "react-router-dom";
import { financialEntryApi } from "../api/financialEntryApi";
import { useEffect, useState } from "react";
import styles from "./EntriesPage.module.css";
import { EntryType } from "../types/EntryType";
import type { FinancialEntryViewModel } from "../types/FinancialEntryViewModel";
import { TableActionButton } from "../components/Table/TableActionButton";
import { Trash, Pencil } from "lucide-react";

export function EntriesPage() {
  const [entries, setEntries] = useState<FinancialEntryViewModel[]>([]);

  useEffect(() => {
    financialEntryApi.list().then((res) => {
      const list: FinancialEntryViewModel[] = res.data.financialsByUser.map(
        (entry) => ({
          id: entry.id!,
          amount: entry.amount,
          category: entry.category,
          description: entry.description,
          date: new Date(entry.date).toLocaleDateString("pt-BR"),
          type: entry.type === EntryType.Expense ? "Saída" : "Entrada",
          isFixed: entry.isFixed ? "Sim" : "Não",
          actions: (
            <div
              style={{ display: "flex", gap: "8px", justifyContent: "center" }}
            >
              <Link to={"/entries/update"} state={{ entry }}>
                <TableActionButton
                  icon={<Pencil size={18} />}
                  tooltip="Editar"
                />
              </Link>

              <TableActionButton
                icon={<Trash size={18} />}
                onClick={() => handleDelete(entry.id!)}
                tooltip="Excluir"
                className="delete"
              />
            </div>
          ),
        })
      );

      setEntries(list);
    });
  }, []);

  const handleDelete = async (id: string) => {
    await financialEntryApi.delete(id);
    setEntries((prev) => prev.filter((e) => e.id != id));
  };

  const columns = [
    { label: "Identificador", key: "id" },
    { label: "Valor", key: "amount" },
    { label: "Categoria", key: "category" },
    { label: "Descrição", key: "description" },
    { label: "Data", key: "date" },
    { label: "Tipo", key: "type" },
    { label: "Fixo", key: "isFixed" },
    { label: "Ações", key: "actions" },
  ];

  return (
    <MainLayout>
      <div className={styles.container}>
        <div className={styles.topContainer}>
          <h1>Lançamentos</h1>
          <Link to={"/entries/new"}>
            <Button label="Novo lançamento" />
          </Link>
        </div>

        <div className={styles.tableContainer}>
          <Table columns={columns} data={entries}></Table>
        </div>
      </div>
    </MainLayout>
  );
}
