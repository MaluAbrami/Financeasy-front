import { MainLayout } from "../../layout/MainLayout";
import { Button } from "../../components/Button/Button";
import { Table } from "../../components/Table/Table";
import { Link } from "react-router-dom";
import { useEffect, useState, type ChangeEvent, type JSX } from "react";
import styles from "../Entries/EntriesPage.module.css";
import { TableActionButton } from "../../components/Table/TableActionButton";
import { Trash, Pencil } from "lucide-react";
import { CreateRecurrenceModal } from "../../components/Modal/Recurrence/CreateRecurrenceModal";
import { recurrenceApi } from "../../api/recurrenceApi";
import type { Recurrence } from "../../types/Recurrence";
import { categoryApi } from "../../api/categoryApi";

type RecurrenceViewModel = Recurrence & {
  frequencyLabel: string;
  startDateLabel: string;
  endDateLabel: string;
  isActiveLabel: string;
  actions: JSX.Element;
};

const getFrequencyLabel = (frequency: string): string => {
  switch (frequency) {
    case "Weekly":
      return "Semanal";
    case "Monthly":
      return "Mensal";
    case "Yearly":
      return "Anual";
    default:
      return frequency;
  }
};

const getDayOfWeekLabel = (day?: number): string => {
  if (day === undefined) return "-";
  const days = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
  return days[day] || "-";
};

type Category = { id: string; name: string };

export function RecurrencesPage() {
  const [recurrences, setRecurrences] = useState<RecurrenceViewModel[]>([]);
  const [categoryId, setCategoryId] = useState("");
  const [openRecurrenceModal, setOpenRecurrenceModal] = useState(false);

  const [categories, setCategories] = useState<Category[]>([]);

  function loadRecurrences(categoryId: string) {
    if (!categoryId) return;
    
    recurrenceApi.getAllByCategory(categoryId).then((res) => {
      const list: RecurrenceViewModel[] = res.data.recurrences.map((recurrence: { frequency: string; startDate: string | number | Date; endDate: string | number | Date; isActive: any; id: string; }) => ({
        ...recurrence,
        frequencyLabel: getFrequencyLabel(recurrence.frequency),
        startDateLabel: recurrence.startDate 
          ? new Date(recurrence.startDate).toLocaleDateString("pt-BR")
          : "-",
        endDateLabel: recurrence.endDate 
          ? new Date(recurrence.endDate).toLocaleDateString("pt-BR")
          : "-",
        isActiveLabel: recurrence.isActive ? "Sim" : "Não",
        actions: (
          <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
            <Link to={"/recurrences/update"} state={{ recurrence }}>
              <TableActionButton icon={<Pencil size={18} />} tooltip="Editar" />
            </Link>
            <TableActionButton
              icon={<Trash size={18} />}
              onClick={() => handleDelete(recurrence.id)}
              tooltip="Excluir"
              className="delete"
            />
          </div>
        ),
      }));
      setRecurrences(list);
    });
  }

  useEffect(() => {
    async function loadCategories() {
        try {
            const response = await categoryApi.listFixeds();
            setCategories(response.data.categorys);
        } catch {
            alert("Erro ao carregar categorias");
        }
    }
    loadCategories();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir esta recorrência?")) {
      await recurrenceApi.delete(id);
      loadRecurrences(categoryId);
    }
  };

  const columns = [
    { label: "Valor", key: "amount" },
    { label: "Frequência", key: "frequencyLabel" },
    { label: "Dia do Mês", key: "dayOfMonth" },
    { label: "Data Início", key: "startDateLabel" },
    { label: "Data Fim", key: "endDateLabel" },
    { label: "Ativa", key: "isActiveLabel" },
    { label: "Ações", key: "actions" },
  ];

    function handleCategoryChange(e: ChangeEvent<HTMLSelectElement>) {
        const selectedCategoryId = e.target.value;

        setCategoryId(selectedCategoryId);
        loadRecurrences(selectedCategoryId);
    }

  return (
    <MainLayout>
      <div className={styles.container}>
        <div className={styles.topContainer}>
          <h1>Recorrências</h1>
          <div>
            <label>Categoria</label>
            <select
                value={categoryId}
                onChange={handleCategoryChange}
                required
            >
                <option value="">Selecione uma categoria</option>
                {categories.map((category) => (
                <option key={category.id} value={category.id}>
                    {category.name}
                </option>
                ))}
            </select>
          </div>
          <div className={styles.buttonsContainer}>
            <div>
              <Button label="Nova recorrência" onClick={() => setOpenRecurrenceModal(true)} />
            </div>
          </div>
        </div>

        <div className={styles.tableContainer}>
          <Table columns={columns} data={recurrences}></Table>
        </div>
      </div>
      <CreateRecurrenceModal
        isOpen={openRecurrenceModal}
        onClose={() => setOpenRecurrenceModal(false)}
        onCreated={() => loadRecurrences(categoryId)}
      />
    </MainLayout>
  );
}