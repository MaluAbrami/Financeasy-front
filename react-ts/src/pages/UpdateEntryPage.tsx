import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import { EntryType } from "../types/EntryType";
import { financialEntryApi } from "../api/financialEntryApi";
import { MainLayout } from "../layout/MainLayout";
import styles from "./NewEntryPage.module.css";
import { Button } from "../components/Button/Button";

export function UpdateEntryPage() {
  const { state } = useLocation();
  const entry = state?.entry; 
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState<EntryType>(entry.type);
  const [isFixed, setIsFixed] = useState(entry.isFixed);
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState("");

  const payload: any = {};

  if (category !== "") payload.category = category;
  if (amount !== 0) payload.amount = amount;
  if (description !== "") payload.description = description;
  if (date !== "") payload.date = date;
  if (type !== entry.type) payload.type = type;
  if (isFixed !== entry.isFixed) payload.isFixed = isFixed;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    try {
      const dateIso = date.toString();

      financialEntryApi.update(entry.id, payload);

      alert("Lançamento atualizado!");
      
    } catch (e) {
      alert("Ocorreu um erro");
    }
  }

  return (
    <MainLayout>
      <div className={styles.container}>
        <h1>Novo Lançamento</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.allFormsContainer}>
            <div className={styles.formContainer}>
              <label>Categoria</label>
              <input
                type="text"
                defaultValue={entry.category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div className={styles.formContainer}>
              <label>Valor</label>
              <input
                type="number"
                defaultValue={entry.amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </div>
            <div className={styles.formContainer}>
              <label>Data</label>
              <input 
                type="date"
                defaultValue={entry.date.split("T")[0]}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className={styles.formContainer}>
              <label>Tipo</label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="type"
                  checked={type === EntryType.Income}
                  defaultChecked={entry.type === EntryType.Income}
                  onChange={() => setType(EntryType.Income)}
                />
                <span>Entrada</span>
              </label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="type"
                  checked={type === EntryType.Expense}
                  defaultChecked={entry.type === EntryType.Expense}
                  onChange={() => setType(EntryType.Expense)}
                />
                <span>Saída</span>
              </label>
            </div>
            <div className={styles.formContainer}>
              <label>Fixo</label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="isFixed"
                  defaultChecked={entry.isFixed === true}
                  onChange={() => setIsFixed(true)}
                />
                <span>Sim</span>
              </label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="isFixed"
                  defaultChecked={entry.isFixed === false}
                  onChange={() => setIsFixed(false)}
                />
                <span>Não</span>
              </label>
            </div>
            <div className={styles.formContainer}>
              <label>Descrição</label>
              <input
                type="text"
                defaultValue={entry.description}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setDescription(e.target.value)
                }
              />
            </div>
            <div className={styles.buttonContainer}>
              <Link to={"/entries"}>
                <Button type="button" label="Voltar" />
              </Link>
              <Button type="submit" label="Salvar" />
            </div>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}
