import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Modal } from "../Modal/Modal";
import { Button } from "../Button/Button";
import styles from "../../pages/NewEntryPage.module.css";
import { categoryApi } from "../../api/categoryApi";
import { financialEntryApi } from "../../api/financialEntryApi";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onCreated?: () => void;
};

type Category = { id: string; name: string };

export function CreateEntryModal({ isOpen, onClose, onCreated }: Props) {
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (!isOpen) return;
    async function loadCategories() {
      try {
        const response = await categoryApi.list();
        setCategories(response.data.categorys);
      } catch {
        alert("Erro ao carregar categorias");
      }
    }
    loadCategories();
  }, [isOpen]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      await financialEntryApi.create({ amount, description, date, categoryId });
      alert("Lançamento cadastrado!");
      setDescription("");
      setCategoryId("");
      setAmount(0);
      setDate("");
      onClose();
      onCreated?.();
    } catch (err) {
      alert("Ocorreu um erro");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Novo Lançamento">
      <form onSubmit={handleSubmit} className={styles.allFormsContainer}>
        <div className={styles.formContainer}>
          <label>Categoria</label>
          <select
            value={categoryId}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setCategoryId(e.target.value)}
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

        <div className={styles.formContainer}>
          <label>Valor</label>
          <input
            type="number"
            value={amount}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setAmount(Number(e.target.value))}
            placeholder="R$ 0,00"
            required
          />
        </div>

        <div className={styles.formContainer}>
          <label>Data</label>
          <input
            type="date"
            name="date"
            value={date}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
            required
          />
        </div>

        <div className={styles.formContainer}>
          <label>Descrição</label>
          <input
            type="text"
            value={description}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
            placeholder="Sinta-se a vontade para dar uma descrição do registro"
          />
        </div>

        <div className={styles.buttonContainer}>
          <Button type="button" label="Cancelar" onClick={onClose} />
          <Button type="submit" label={loading ? "Salvando..." : "Salvar"} />
        </div>
      </form>
    </Modal>
  );
}
