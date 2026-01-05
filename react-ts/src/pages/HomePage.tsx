import { MainLayout } from "../layout/MainLayout";
import { Button } from "../components/Button/Button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./HomePage.module.css";
import { dashboardApi } from "../api/dashboardsApi";
import { Table } from "../components/Table/Table";
import type { GetBalanceEvolutionResponse } from "../types/GetBalanceEvolutionResponse";
import type { UpdateResponse } from "../types/UpdateResponse";
import { manualUpdateApi } from "../api/manualUpdateApi";
import { parseBackendDate } from "../utils/ParseBackendDate";

export function HomePage() {
  const [financialSummary, setFinancialSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    totalBalance: 0,
  });

  const date = new Date();
  const [initialYear] = useState<number>(date.getFullYear());
  const [initialMonth] = useState<number>(1);
  const [endYear] = useState<number>(date.getFullYear());
  const [endMonth] = useState<number>(date.getMonth() + 1);

  const [balanceEvolution, setBalanceEvolution] =
    useState<GetBalanceEvolutionResponse>({
      balances: [],
    });

  const [lastUpdate, setLastUpdate] = useState<UpdateResponse | null>(null);

  useEffect(() => {
    dashboardApi.getFinancialSummary().then((response) => {
      setFinancialSummary(response.data);
    });

    dashboardApi
      .getBalanceEvolution(initialYear, initialMonth, endYear, endMonth)
      .then((response) => {
        setBalanceEvolution(response.data);
      });

    manualUpdateApi.getLastUpdate().then((response) => {
      setLastUpdate(response.data ?? null);
    });
  }, [initialYear, initialMonth, endYear, endMonth]);

  async function handleUpdate() {
    try {
      await manualUpdateApi.create();
      alert("Atualizado com sucesso!");
    } catch {
      alert("Ocorreu um erro ao atualizar");
    }
  }

  const columns = [
    { label: "Período", key: "period" },
    { label: "Entradas", key: "totalIncomes" },
    { label: "Saídas", key: "totalExpenses" },
    { label: "Saldo do Período", key: "totalMonthBalance" },
    { label: "Saldo Acumulado", key: "totalAccumulatedBalance" },
  ];

  const parsedLastUpdate =
    lastUpdate?.updateDate
      ? parseBackendDate(lastUpdate.updateDate)
      : null;

  const formattedLastUpdate =
    parsedLastUpdate?.toLocaleDateString("pt-BR", {
      timeZone: "America/Sao_Paulo",
    });

  const today = new Date().toLocaleDateString("pt-BR", {
    timeZone: "America/Sao_Paulo",
  });

  const shouldShowUpdateButton =
  !formattedLastUpdate || formattedLastUpdate !== today;

  return (
    <MainLayout>
      <div className={styles.container}>
        <div className={styles.topContainer}>
          <div>
            <h1>Dashboard Financeiro</h1>
            <p>Bem-vindo(a) ao seu controle financeiro pessoal!</p>
          </div>

          <div className={styles.updateContainer}>
            {!formattedLastUpdate ? (
              <p>Ainda não foi realizada nenhuma atualização</p>
            ) : (
              <p>
                Última atualização realizada dia {formattedLastUpdate}
                {formattedLastUpdate === today && " (hoje)"}
              </p>
            )}

            { shouldShowUpdateButton && (
              <Button label="Atualizar agora" onClick={handleUpdate} />
            )}
          </div>
        </div>

        <div className={styles.bottomContainer}>
          <div
            className={`${styles.dashboardsContainer} ${styles.balanceEvolution}`}
          >
            <div className={styles.bottomContainer}>
              <h2>
                Evolução de Saldo entre o período de {initialMonth}/{initialYear}{" "}
                e {endMonth}/{endYear}
              </h2>

              <div className={styles.buttonsContainer}>
                <Link to={"/entries"}>
                  <Button label="Ver lançamentos" />
                </Link>

                <Link to={"/recurrences"}>
                  <Button label="Ver recorrências" />
                </Link>


                <Link to={"/categories"}>
                  <Button label="Ver categorias" />
                </Link>
              </div>
            </div>

            <div className={styles.tableWrapper}>
              <Table columns={columns} data={balanceEvolution.balances} />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
