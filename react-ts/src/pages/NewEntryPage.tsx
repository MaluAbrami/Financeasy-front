import { MainLayout } from "../layout/MainLayout";
import { Button } from "../components/Button/Button.tsx";
import { useState, type FormEvent, type ChangeEvent } from "react";
import { Link } from "react-router-dom";
import styles from "./NewEntryPage.module.css";

export function NewEntryPage() {
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("Expense");
  const [isFixed, setIsFixed] = useState("false");
  const [amount, setAmount] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    alert("Em breve enviaremos ao backend!");
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
                  setAmount(e.target.value)
                }
                placeholder="R$ 0,00"
                required
              />
            </div>
            <div className={styles.formContainer}>
              <label>Tipo</label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="type"
                  value="Income"
                  checked={type === "Income"}
                  onChange={() => setType("Income")}
                  required
                />
                <span>Entrada</span>
              </label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="type"
                  value="Expense"
                  checked={type === "Expense"}
                  onChange={() => setType("Expense")}
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
                  checked={isFixed === "true"}
                  onChange={() => setIsFixed("true")}
                />
                <span>Sim</span>
              </label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="isFixed"
                  value="false"
                  checked={isFixed === "false"}
                  onChange={() => setIsFixed("false")}
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
