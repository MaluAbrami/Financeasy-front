import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MainLayout } from "../layout/MainLayout";
import { Button } from "../components/Button/Button";
import { categoryApi } from "../api/categoryApi";
import styles from "./NewEntryPage.module.css";

export function NewCategoryPage() {
  const navigate = useNavigate();

  // Campos principais
  const [name, setName] = useState("");
  const [type, setType] = useState<number>(0); // 0 = Expense, 1 = Income
  const [isFixed, setIsFixed] = useState<boolean>(false);

  // Campos de recorrência (só aparecem quando isFixed = true)
  const [frequency, setFrequency] = useState<number>(0);
  const [dayOfMonth, setDayOfMonth] = useState<number>(1);
  const [dayOfWeek, setDayOfWeek] = useState<number>(0);
  const [adjustmentRule, setAdjustmentRule] = useState<number>(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [amount, setAmount] = useState<number>(0);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const payload: any = {
        name,
        type,
        isFixed,
      };

      if (isFixed) {
        payload.recurrence = {
          frequency,
          dayOfMonth,
          dayOfWeek,
          adjustmentRule,
          startDate: startDate ? new Date(startDate).toISOString() : null,
          endDate: endDate ? new Date(endDate).toISOString() : null,
          amount,
        };
      }

      await categoryApi.create(payload);

      alert("Categoria cadastrada com sucesso!");
      navigate("/entries");
    } catch (error) {
      alert("Ocorreu um erro ao cadastrar a categoria");
    }
  }

  return (
    <MainLayout>
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.allFormsContainer}>
            <h1>Nova Categoria</h1>

            <div className={styles.formContainer}>
              <label>Nome</label>
              <input
                type="text"
                value={name}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)
                }
                placeholder="Nome da categoria"
                required
              />
            </div>

            <div className={styles.formContainer}>
              <label>Tipo</label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="type"
                  value={0}
                  checked={type === 0}
                  onChange={() => setType(0)}
                  required
                />
                <span>Despesa</span>
              </label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="type"
                  value={1}
                  checked={type === 1}
                  onChange={() => setType(1)}
                />
                <span>Receita</span>
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

            {isFixed && (
              <>
                <div className={styles.formContainer}>
                  <label>Frequência</label>
                  <select
                    value={frequency}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                      setFrequency(Number(e.target.value))
                    }
                    required
                  >
                    <option value={0}>Diária</option>
                    <option value={1}>Semanal</option>
                    <option value={2}>Mensal</option>
                    <option value={3}>Anual</option>
                  </select>
                </div>

                {frequency === 2 && (
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

                {frequency === 1 && (
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

                <div className={styles.formContainer}>
                  <label>Regra de Ajuste</label>
                  <select
                    value={adjustmentRule}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                      setAdjustmentRule(Number(e.target.value))
                    }
                  >
                    <option value={0}>Nenhuma</option>
                    <option value={1}>Próximo dia útil</option>
                    <option value={2}>Dia útil anterior</option>
                  </select>
                </div>

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
                    value={endDate}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setEndDate(e.target.value)
                    }
                  />
                </div>

                <div className={styles.formContainer}>
                  <label>Valor</label>
                  <input
                    type="number"
                    step="0.01"
                    value={amount}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setAmount(Number(e.target.value))
                    }
                    placeholder="R$ 0,00"
                    required
                  />
                </div>
              </>
            )}

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
