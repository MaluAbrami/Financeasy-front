import { MainLayout } from "../layout/MainLayout";
import { Card } from "../components/Card/Card";
import { Button } from "../components/Button/Button";
import { useState, type FormEvent } from "react";

export function NewEntryPage() {
    const [description, setDescription] = useState("");
    const [type, setType] = useState("entrada");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        alert("Em breve enviaremos ao backend!")
    }

    return (
        <MainLayout>
            <h1>Novo Lançamento</h1>

            <Card>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    
                    <div>
                        <label>Descrição</label><br />
                        <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{ padding: "8px", width: "100%" }}
                        required
                        />
                    </div>

                    <div>
                        <label>Tipo</label><br />
                        <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        style={{ padding: "8px", width: "100%" }}
                        >
                        <option value="entrada">Entrada</option>
                        <option value="saida">Saída</option>
                        </select>
                    </div>

                    <div>
                        <label>Valor (R$)</label><br />
                        <input
                        type="number"
                        step="0.01"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        style={{ padding: "8px", width: "100%" }}
                        required
                        />
                    </div>

                    <div>
                        <label>Data</label><br />
                        <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        style={{ padding: "8px", width: "100%" }}
                        required
                        />
                    </div>

                    <Button type="submit" label="Salvar" />   
                </form>             
            </Card>
        </MainLayout>
    );
}