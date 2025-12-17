import { MainLayout } from "../layout/MainLayout";
import { Button } from "../components/Button/Button";
import { Table } from "../components/Table/Table";
import { Link } from "react-router-dom";
import { categoryApi } from "../api/categoryApi";
import { useEffect, useState } from "react";
import styles from "./EntriesPage.module.css";
import { EntryType } from "../types/EntryType";
import { TableActionButton } from "../components/Table/TableActionButton";
import { Trash, Pencil } from "lucide-react";
import { CategoryOrderBy } from "../types/CategoryOrderBy";
import { SortDirection } from "../types/SortDirection";

interface CategoryViewModel {
  id: string;
  name: string;
  type: string;
  isFixed: string;
  actions: React.ReactNode;
}

export function CategoriesPage() {
  const [categories, setCategories] = useState<CategoryViewModel[]>([]);

  const[page, setPage] = useState<number>(1);
  const[pageSize, setPageSize] = useState<number>(10);
  const[orderBy, setOrderBy] = useState<CategoryOrderBy>(CategoryOrderBy.Name);
  const[direction, setDirection] = useState<SortDirection>(SortDirection.Asc);
  const[totalItems, setTotalItems] = useState<number>(0);
  const[totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    categoryApi.list(page, pageSize, orderBy, direction).then((res) => {
      const list: CategoryViewModel[] = res.data.categorys.map((category) => ({
        id: category.id,
        name: category.name,
        type: category.type === EntryType.Expense ? "Despesa" : "Receita",
        isFixed: category.isFixed ? "Sim" : "Não",
        actions: (
          <div
            style={{ display: "flex", gap: "8px", justifyContent: "center" }}
          >
            <Link to={"/category/update"} state={{ category }}>
              <TableActionButton icon={<Pencil size={18} />} tooltip="Editar" />
            </Link>

            <TableActionButton
              icon={<Trash size={18} />}
              onClick={() => handleDelete(category.id)}
              tooltip="Excluir"
              className="delete"
            />
          </div>
        ),
      }));

      setCategories(list);
      setTotalPages(res.data.pagination.totalPages);
    });
  }, [page]);

  const handleDelete = async (id: string) => {
    await categoryApi.delete(id);
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  const columns = [
    { label: "Identificador", key: "id" },
    { label: "Nome", key: "name" },
    { label: "Tipo", key: "type" },
    { label: "Fixo", key: "isFixed" },
    { label: "Ações", key: "actions" },
  ];

  return (
    <MainLayout>
      <div className={styles.container}>
        <div className={styles.topContainer}>
          <h1>Categorias</h1>
          <div className={styles.buttonsContainer}>
            <div>
              <Link to={"/category/new"}>
                <Button label="Nova Categoria" />
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.tableContainer}>
          <Table columns={columns} data={categories}></Table>
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
    </MainLayout>
  );
}
