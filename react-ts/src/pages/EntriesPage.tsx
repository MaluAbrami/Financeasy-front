import { MainLayout } from "../layout/MainLayout";
import { Card } from "../components/Card/Card";
import { Button } from "../components/Button/Button";
import { Table } from "../components/Table/Table";
import { Link } from "react-router-dom";
import { financialEntryApi } from "../api/financialEntryApi";
import { useEffect, useState } from "react";
import type { GetAllFinancialEntrysByUser } from "../types/GetAllFinancialEntrysByUser";
import styles from "./EntriesPage.module.css";

export function EntriesPage() {
  const [entries, setEntries] = useState<GetAllFinancialEntrysByUser[]>([]);

  useEffect(() => {
    financialEntryApi.list().then((res) => {
      const list = res.data.financialsByUser.map((entry) => ({
        ...entry,
        type: entry.type == 1 ? "Gasto" : "Ganho",
        isFixed: entry.isFixed ? "Sim" : "Não",
        date: entry.date.split("T")[0], // opcional para formatar
      }));

      setEntries(list);
    });
  }, []);

  const columns = [
    { label: "Identificador", key: "id" },
    { label: "Valor", key: "amount" },
    { label: "Categoria", key: "category" },
    { label: "Descrição", key: "description" },
    { label: "Data", key: "date" },
    { label: "Tipo", key: "type" },
    { label: "Fixo", key: "isFixed" },
  ];

  return (
    <MainLayout>
      <div className={styles.topContainer}>
        <h1>Lançamentos</h1>
        <Link to={"/entries/new"}>
          <Button label="Novo lançamento" />
        </Link>
      </div>

      <Card>
        <Table columns={columns} data={entries}></Table>
      </Card>
    </MainLayout>
  );
}
