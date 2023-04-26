import { FormEvent, useContext, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from '../../styles/home.module.scss';
import logo from '../../../public/uni_pizza_logo.png';
import { Input } from "../../components/ui/Input";
import { ButtonRed } from "../../components/ui/Button";
import { AuthContext } from "../../contexts/AuthContext";
import Link from "next/link";
import { Footer } from "../../components/Footer";

export default function SignUp() {
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
                <title>Uni Pizza - Faça seu cadastro!</title>
            </Head>
            <div className={styles.container}>
                <Image
                    className={styles.logo}
                    src={logo}
                    alt="Logo Uni Pizza"
                />
                <div className={styles.login}>
                    <h1>Criando sua conta</h1>
                    <form onSubmit={handleSignUp}>
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
                        <ButtonRed
                            type="submit"
                            loading={loading}
                        >
                            Cadastrar
                        </ButtonRed>
                    </form>
                    <Link href="/" legacyBehavior>
                        <a className={styles.text}>Já possui uma conta? Faça o login!</a>
                    </Link>
                </div>
            </div>
            <Footer />
        </>
    )
}
