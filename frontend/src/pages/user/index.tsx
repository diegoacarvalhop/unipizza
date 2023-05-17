import { FormEvent, useContext, useState } from "react";
import Head from "next/head";
import styles from './styles.module.scss';
import { Input } from "../../components/ui/Input";
import { ButtonGreen } from "../../components/ui/Button";
import { AuthContext } from "../../contexts/AuthContext";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";

export default function User() {
    const { signUp } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSignUp(event: FormEvent) {
        event.preventDefault();
        if (name === '' || email === '' || password === '') {
            alert('Preencha os campos!');
            return;
        }

        setLoading(true);

        let data = {
            name,
            email,
            password
        }

        await signUp(data);

        setLoading(false);
    }

    return (
        <>
            <Head>
                <title>Uni Pizza - Novo Usuário!</title>
            </Head>
            <Header />
            <div className={styles.container}>
                <h1>Cadastrar Usuário</h1>
                <form onSubmit={handleSignUp}
                    className={styles.form}>
                    <Input
                        placeholder="Digite seu nome"
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                    <Input
                        placeholder="Digite seu e-mail"
                        type="text"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <Input
                        placeholder="Digite sua senha"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <ButtonGreen
                        type="submit"
                        loading={loading}>
                        Cadastrar
                    </ButtonGreen>
                </form>
            </div>
            <Footer />
        </>
    )
}
