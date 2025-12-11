import { useContext } from "react";
import { Button } from "../components/Button/Button";
import { Card } from "../components/Card/Card";
import { MainLayout } from "../layout/MainLayout";
import styles from "./UserPage.module.css";
import { AuthContext } from "../utils/AuthContext";

export function UserPage() {
    const email = localStorage.getItem("userCompanyEmail");
    const {logout} = useContext(AuthContext);

    return (
        <MainLayout>
            <Card>
                <div className={styles.container}>
                    <div className={styles.userContainer}>
                        <div className={styles.imageContainer}>
                            <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="" />
                        </div>
                        <div className={styles.infosContainer}>
                            <p>Email: {email}</p>
                            <p>Senha: *******</p>
                        </div>
                    </div>
                    <div className={styles.buttonsContainer}>
                        <Button label="Atualizar" onClick={() => alert("em breve")}></Button>
                        <Button label="Sair" onClick={() => logout()}></Button>
                    </div>
                </div>
            </Card>
        </MainLayout>
    )
}