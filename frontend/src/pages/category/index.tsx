import { FormEvent, useState } from "react";
import Head from "next/head";
import { Header } from "../../components/Header";
import styles from './styles.module.scss';
import { Input } from "../../components/ui/Input";
import { ButtonGreen } from "../../components/ui/Button";
import { toast } from 'react-toastify';
import { setupAPIClient } from "../../services/api";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { Footer } from "../../components/Footer";

export default function Category() {
    const [name, setName] = useState('');
    async function handleCategory(event: FormEvent) {
        event.preventDefault();
        const apiClient = setupAPIClient();
        try {
            const response = await apiClient.post('/category', {
                name: name
            });
            toast.success('Categoria ' + response.data.name + ' cadastrada com sucesso', {
                theme: "dark"
            });
        } catch (error) {
            toast.error('Erro ao cadastrar a categoria! Erro: ' + error.response.data.error, {
                theme: "dark"
            });
        }
        setName('');
    }
    return (
        <>
            <Head>
                <title>Cadastrar Categoria - Uni Pizza</title>
            </Head>
            <div>
                <Header />
                <main className={styles.container}>
                    <h1>Cadastrar Categorias</h1>
                    <form
                        onSubmit={handleCategory}
                        className={styles.form}>
                        <Input
                            type="text"
                            placeholder="Digite o nome da categoria"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                        <ButtonGreen
                            type="submit">
                            Cadastrar
                        </ButtonGreen>
                    </form>
                </main>
                <Footer />
            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (context) => {
    return {
        props: {}
    }
});