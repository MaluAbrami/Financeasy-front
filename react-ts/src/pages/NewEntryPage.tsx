import { MainLayout } from "../layout/MainLayout";
import { Button } from "../components/Button/Button.tsx";
import { useState, type FormEvent, type ChangeEvent, useEffect } from "react";
import { Link } from "react-router-dom";
import { financialEntryApi } from "../api/financialEntryApi.ts";
import styles from "./NewEntryPage.module.css";
import { categoryApi } from "../api/categoryApi.ts";

type Category = {
  id: string;
  name: string;
};

export function NewEntryPage() {
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState("");

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function loadCategories() {
      try {
        const response = await categoryApi.list();
        setCategories(response.data.categorys);
      } catch {
        alert("Erro ao carregar categorias");
      }
    }

    loadCategories();
  }, []);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      financialEntryApi.create({ amount, description, date, categoryId });

      alert("Lançamento cadastrado!");
      setDescription("");
      setCategoryId("");
      setAmount(0);
      setDate("");
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
              <select
                value={categoryId}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setCategoryId(e.target.value)
                }
                required
              >
                <option value="">Selecione uma categoria</option>

                {categories!.map((category) => (
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
            <div className={styles.formContainer}>
              <label>Data</label>
              <input
                type="date"
                name="date"
                value={date}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setDate(e.target.value)
                }
                required
              />
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
