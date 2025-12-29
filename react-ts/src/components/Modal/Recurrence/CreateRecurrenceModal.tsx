import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Modal } from "../Modal";
import { Button } from "../../Button/Button";
import styles from "../../../pages/NewEntryPage.module.css";
import { categoryApi } from "../../../api/categoryApi";
import { financialEntryApi } from "../../../api/financialEntryApi";
import { recurrenceApi } from "../../../api/recurrenceApi";
import { AdjustmentRule } from "../../../types/AdjustmentRule";
import { Frequency } from "../../../types/Frequency";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onCreated?: () => void;
};

type Category = { id: string; name: string };

export function CreateRecurrenceModal({ isOpen, onClose, onCreated }: Props) {
  const [frequency, setFrequency] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [dayOfMonth, setDayOfMonth] = useState(1);
  const [dayOfWeek, setDayOfWeek] = useState(0);
  const [adjustmentRule, setAdjustmentRule] = useState<AdjustmentRule>(AdjustmentRule.Exact);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState<string | null>(null);
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (!isOpen) return;
    async function loadCategories() {
      try {
        const response = await categoryApi.listFixeds();
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
      await recurrenceApi.create({
        categoryId,
        frequency,
        dayOfMonth,
        dayOfWeek,
        adjustmentRule,
        startDate,
        endDate,
        amount,
      });
      alert("Recorrência cadastrada!");
      setFrequency("");
      setCategoryId("");
      setAmount(0);
      setDayOfMonth(1);
      setDayOfWeek(0);
      setStartDate("");
      setEndDate(null);
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
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setCategoryId(e.target.value)
            }
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
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setAmount(Number(e.target.value))
            }
            placeholder="R$ 0,00"
            required
          />
        </div>

        <div className={styles.lineContainer}>
          <div className={styles.formContainer}>
            <label>Frequência</label>
            <select
              value={frequency}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setFrequency(e.target.value as Frequency)
              }
              required
            >
              <option value={Frequency.Weekly}>Semanal</option>
              <option value={Frequency.Monthly}>Mensal</option>
              <option value={Frequency.Yearly}>Anual</option>
            </select>
          </div>

          {frequency === Frequency.Monthly && (
            <div className={styles.formContainer}>
              <label>Dia do Mês</label>
              <input
                type="number"
                min={1}
                max={31}
                value={dayOfMonth}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setDayOfMonth(Number(e.target.value))
                }
                required
              />
            </div>
          )}

          {frequency === Frequency.Weekly && (
            <div className={styles.formContainer}>
              <label>Dia da Semana</label>
              <select
                value={dayOfWeek}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setDayOfWeek(Number(e.target.value))
                }
                required
              >
                <option value={0}>Domingo</option>
                <option value={1}>Segunda-feira</option>
                <option value={2}>Terça-feira</option>
                <option value={3}>Quarta-feira</option>
                <option value={4}>Quinta-feira</option>
                <option value={5}>Sexta-feira</option>
                <option value={6}>Sábado</option>
              </select>
            </div>
          )}
        </div>

        <div className={styles.lineContainer}>
          <div className={styles.formContainer}>
            <label>Regra de Ajuste</label>
            <select
              value={adjustmentRule}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setAdjustmentRule(e.target.value as AdjustmentRule)
              }
            >
              <option value={AdjustmentRule.Exact}>Dia exato</option>
              <option value={AdjustmentRule.FifthBusinessDay}>
                Quinto dia útil
              </option>
              <option value={AdjustmentRule.LastBusinessDay}>
                Último dia útil
              </option>
              <option value={AdjustmentRule.LastDayOfMonth}>
                Último dia do mês
              </option>
            </select>
          </div>
        </div>

        <div className={styles.lineContainer}>
          <div className={styles.formContainer}>
            <label>Data de Início</label>
            <input
              type="date"
              value={startDate}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setStartDate(e.target.value)
              }
              required
            />
          </div>

          <div className={styles.formContainer}>
            <label>Data de Fim (opcional)</label>
            <input
              type="date"
              value={endDate || ""}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEndDate(e.target.value || null)
              }
            />
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <Button type="button" label="Cancelar" onClick={onClose} />
          <Button type="submit" label={loading ? "Salvando..." : "Salvar"} />
        </div>
      </form>
    </Modal>
  );
}
