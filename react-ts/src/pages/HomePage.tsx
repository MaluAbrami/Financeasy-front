import { MainLayout } from "../layout/MainLayout";
import { Button } from "../components/Button/Button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./HomePage.module.css"
import { dashboardApi } from "../api/dashboardsApi";
import type { BalanceResponse } from "../types/BalanceResponse";
import { Table } from "../components/Table/Table";
import type { GetBalanceEvolutionResponse } from "../types/GetBalanceEvolutionResponse";
export function HomePage() {
    const [financialSummary, setFinancialSummary] = useState({
        totalIncome: 0,
        totalExpense: 0,
        totalBalance: 0,
    });

    var date = new Date();
    const [initialYear, setInitialYear] = useState<number>(date.getFullYear());
    const [initialMonth, setInitialMonth] = useState<number>(1);
    const [endYear, endInitialYear] = useState<number>(date.getFullYear());
    const [endMonth, setEndMonth] = useState<number>(date.getMonth() + 1);

    const [balanceEvolution, setBalanceEvolution] = useState<GetBalanceEvolutionResponse>({
        balances: []
    });

    useEffect(() => {
        dashboardApi.getFinancialSummary().then((response) => {
            setFinancialSummary(response.data);
        });
        dashboardApi.getBalanceEvolution(initialYear, initialMonth, endYear, endMonth).then((response) =>{
            setBalanceEvolution(response.data);
        })
    }, []);
    
    const columns = [
        { label: "Período", key: "period" },
        { label: "Entradas", key: "totalIncomes" },
        { label: "Saídas", key: "totalExpenses" },
        { label: "Saldo do Período", key: "totalMonthBalance" },
        { label: "Saldo Acumulado", key: "totalAccumulatedBalance" }
    ];

    return (
        <MainLayout>
            <div className={styles.container}>
                <div className={styles.topContainer}>
                    <div className={styles.introContainer}>
                        <h1>Dashboard Financeiro</h1>
                        <p>Bem-vindo(a) ao seu controle financeiro pessoal!</p>
                    </div>
                    <Link to={"/entries"}>
                        <Button label="Ver lançamentos"></Button>
                    </Link>
                </div>

                <div className={styles.bottomContainer}>
                    <div className={styles.dashboardsContainer}>
                        <h2>Resumo Geral</h2>
                        <p>Entradas: R$ {financialSummary.totalIncome}</p>
                        <p>Saídas: R$ {financialSummary.totalExpense}</p>
                        <p>Saldo: R$ {financialSummary.totalBalance}</p>
                    </div>
                    <div className={`${styles.dashboardsContainer} ${styles.balanceEvolution}`}>
                        <h2>Evolução de Saldo entre o período de {initialMonth}/{initialYear} e {endMonth}/{endYear}</h2>
                        <Table columns={columns} data={balanceEvolution.balances}></Table>
                    </div>
                </div>
            </div>     
        </MainLayout>
    );
}