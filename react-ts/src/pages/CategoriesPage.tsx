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

interface CategoryViewModel {
  id: string;
  name: string;
  type: string;
  isFixed: string;
  actions: React.ReactNode;
}

export function CategoriesPage() {
  const [categories, setCategories] = useState<CategoryViewModel[]>([]);

  useEffect(() => {
    categoryApi.list().then((res) => {
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
    });
  }, []);

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
      </div>
    </MainLayout>
  );
}