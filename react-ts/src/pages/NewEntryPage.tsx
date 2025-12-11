import { MainLayout } from "../layout/MainLayout";
import { Button } from "../components/Button/Button.tsx";
import { useState, type FormEvent, type ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { financialEntryApi } from "../api/financialEntryApi.ts";
import styles from "./NewEntryPage.module.css";
import { EntryType } from "../types/EntryType.ts";

export function NewEntryPage() {
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState<EntryType>(EntryType.Expense);
  const [isFixed, setIsFixed] = useState(false);
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    try {
      const dateIso = date.toString();

      financialEntryApi.create({amount, category, description, date, type, isFixed});

      alert("Lançamento cadastrado!");
      
    } catch (e) {
      alert("Ocorreu um erro");
    }
  }

  return (
    <MainLayout>
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.allFormsContainer}>
            <h1>Novo Lançamento</h1>
            <div className={styles.formContainer}>
              <label>Categoria</label>
              <input
                type="text"
                value={category}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setCategory(e.target.value)
                }
                placeholder="Informe a categoria do registro para facilitar buscas"
                required
              />
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
            <div className={styles.formContainer}>
              <label>Data</label>
              <input 
                type="date"
                name="date" 
                value={date}
                onChange={(e : ChangeEvent<HTMLInputElement>) => 
                  setDate(e.target.value)}
                required
                />
            </div>

            <div className={styles.formContainer}>
              <label>Tipo</label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="type"
                  value= "EntryType.Income"
                  checked={type === EntryType.Income}
                  onChange={() => setType(EntryType.Income)}
                  required
                />
                <span>Entrada</span>
              </label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="type"
                  value="EntryType.Expense"
                  checked={type === EntryType.Expense}
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
                  value="true"
                  checked={isFixed === true}
                  onChange={() => setIsFixed(true)}
                />
                <span>Sim</span>
              </label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="isFixed"
                  value="false"
                  checked={isFixed === false}
                  onChange={() => setIsFixed(false)}
                />
                <span>Não</span>
              </label>
            </div>
            <div className={styles.formContainer}>
              <label>Descrição</label>
              <input
                type="text"
                value={description}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setDescription(e.target.value)
                }
                placeholder="Sinta-se a vontade para dar uma descrição do registro"
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
