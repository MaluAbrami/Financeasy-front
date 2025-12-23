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
import { FinancialEntryOrderBy } from "../types/FinancialEntryOrderBy";
import { SortDirection } from "../types/SortDirection";
import { CreateEntryModal } from "../components/Entry/CreateEntryModal";
import { CreateCategoryModal } from "../components/Category/CreateCategoryModal";

export function EntriesPage() {
  const [entries, setEntries] = useState<FinancialEntryViewModel[]>([]);

  const[page, setPage] = useState<number>(1);
  const[pageSize, setPageSize] = useState<number>(10);
  const[orderBy, setOrderBy] = useState<FinancialEntryOrderBy>(FinancialEntryOrderBy.Date);
  const[direction, setDirection] = useState<SortDirection>(SortDirection.Asc);
  const[totalItems, setTotalItems] = useState<number>(0);
  const[totalPages, setTotalPages] = useState<number>(1);
  const [openEntryModal, setOpenEntryModal] = useState(false);
  const [openCategoryModal, setOpenCategoryModal] = useState(false);

  function loadEntries() {
    financialEntryApi.list(page, pageSize, orderBy, direction).then((res) => {
      const list: FinancialEntryViewModel[] = res.data.financialsByUser.map((entry) => ({
        id: entry.id!,
        amount: entry.amount,
        categoryName: entry.categoryName,
        description: entry.description,
        date: new Date(entry.date).toLocaleDateString("pt-BR"),
        type: entry.type === EntryType.Expense ? "Saída" : "Entrada",
        isFixed: entry.isFixed ? "Sim" : "Não",
        actions: (
          <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
            <Link to={"/entries/update"} state={{ entry }}>
              <TableActionButton icon={<Pencil size={18} />} tooltip="Editar" />
            </Link>
            <TableActionButton
              icon={<Trash size={18} />}
              onClick={() => handleDelete(entry.id!)}
              tooltip="Excluir"
              className="delete"
            />
          </div>
        ),
      }));
      setEntries(list);
      setTotalPages(res.data.pagination.totalPages);
    });
  }

  useEffect(() => {
    loadEntries();
  }, [page]);

  const handleDelete = async (id: string) => {
    await financialEntryApi.delete(id);
    financialEntryApi.list(page, pageSize, orderBy, direction).then((res) => {
      const list: FinancialEntryViewModel[] = res.data.financialsByUser.map((entry) => ({
        id: entry.id!,
        amount: entry.amount,
        categoryName: entry.categoryName,
        description: entry.description,
        date: new Date(entry.date).toLocaleDateString("pt-BR"),
        type: entry.type === EntryType.Expense ? "Saída" : "Entrada",
        isFixed: entry.isFixed ? "Sim" : "Não",
        actions: (
          <div className={styles.actionsCell}>
            <Link to={"/entries/update"} state={{ entry }}>
              <TableActionButton icon={<Pencil size={18} />} tooltip="Editar" />
            </Link>
            <TableActionButton
              icon={<Trash size={18} />}
              onClick={() => handleDelete(entry.id!)}
              tooltip="Excluir"
              className="delete"
            />
          </div>
        ),
      }));
      setEntries(list);
      setTotalPages(res.data.pagination.totalPages);
    });
  };

  const columns = [
    { label: "Identificador", key: "id" },
    { label: "Valor", key: "amount" },
    { label: "Categoria", key: "categoryName" },
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
          <div className={styles.buttonsContainer}>
            <div>
              <Button label="Novo lançamento" onClick={() => setOpenEntryModal(true)} />
            </div>
            <div>
              <Button label="Nova Categoria" onClick={() => setOpenCategoryModal(true)} />
            </div>
          </div>
        </div>

        <div className={styles.tableContainer}>
          <Table columns={columns} data={entries}></Table>
        </div>
        <div className={styles.pagination}>
            <Button
              label="Anterior"
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
            />

            <span>
              Página {page} de {totalPages}
            </span>

            <Button
              label="Próxima"
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            />
        </div>
      </div>
      <CreateEntryModal
        isOpen={openEntryModal}
        onClose={() => setOpenEntryModal(false)}
        onCreated={loadEntries}
      />
      <CreateCategoryModal
        isOpen={openCategoryModal}
        onClose={() => setOpenCategoryModal(false)}
        onCreated={loadEntries}
      />
    </MainLayout>
  );
}
