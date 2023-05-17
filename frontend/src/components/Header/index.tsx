import { useContext } from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../public/uni_pizza_logo.png';
import { FiLogOut, FiUser } from 'react-icons/fi';
import { AuthContext } from '../../contexts/AuthContext';

export function Header() {
    const { user, signOut } = useContext(AuthContext);

    return (
        <header className={styles.container}>
            <div className={styles.content}>
                <Link href="/dashboard">
                    <Image
                        className={styles.logo}
                        src={logo}
                        alt="Logo Uni Pizza" />
                </Link>
                <div className={styles.usuario}>
                    <FiUser size={24} />
                    <a className={styles.usuario}>{user?.name}</a>
                </div>
                <nav className={styles.nav}>
                    <Link href="/tables" legacyBehavior>
                        <a>Mesas</a>
                    </Link>
                    <Link href="/categories" legacyBehavior>
                        <a>Categorias</a>
                    </Link>
                    <Link href="/products" legacyBehavior>
                        <a>Produtos</a>
                    </Link>
                    <Link href="/users" legacyBehavior>
                        <a>Usuários</a>
                    </Link>
                    <button onClick={signOut}>
                        <FiLogOut
                            size={25} />
                    </button>
                </nav>
            </div>
        </header>
    )
}