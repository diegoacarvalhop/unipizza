import { useEffect, useState } from "react";
import Head from "next/head";
import styles from './styles.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../public/uni_pizza_logo.png';
import { setupAPIClient } from "../../services/api";
import { FiFilter } from "react-icons/fi";
import { Footer } from "../../components/Footer";

export type ProductItemProps = {
    id: string;
    name: string;
    price: string;
    description: string;
    banner: string;
    status: boolean,
    category_id: string;
    category: {
        id: string;
        name: string;
    }
}

interface ItemCategoryProps {
    id: string;
    name: string;
}

export default function Menu() {

    const [categories, setCategories] = useState<ItemCategoryProps[] | []>([]);
    const [products, setProducts] = useState<ProductItemProps[] | []>([]);
    const [categorySelected, setCategorySelected] = useState();
    const [imageUrl, setImageUrl] = useState('http://localhost:3333/files/');

    useEffect(() => {
        async function getMenu() {
            const apiClient = setupAPIClient();

            const productsList = await apiClient.get('/menu');
            setProducts(productsList.data);

            const categoriesList = await apiClient.get('/menu/categories');
            setCategories(categoriesList.data);
        }

        getMenu();
    })

    async function handleChangeCategory(event) {
        const apiClient = setupAPIClient();
        if (event.target.value === 'Tudo') {
            const response = await apiClient.get('/menu');
            if (response.data.length === 0) {
                setProducts([]);
            } else {
                setProducts(response.data);
            }
        }
        for (let x = 0; x < categories.length; x++) {
            if (categories[x].name === event.target.value) {
                const response = await apiClient.get('/menu', {
                    params: {
                        category_id: categories[x].id
                    }
                });
                if (response.data.length === 0) {
                    setProducts([]);
                } else {
                    setProducts(response.data);
                }
            }
        }
    }

    return (
        <>
            <Head>
                <title>Listar Produtos - Uni Pizza</title>
            </Head>
            <div>
                <Link href="/dashboard">
                    <Image
                        className={styles.logo}
                        src={logo}
                        alt="Logo Uni Pizza" />
                </Link>
                <main className={styles.container}>
                    <div className={styles.containerHead}>
                        <h1>Menu</h1>
                        <div className={styles.filter}>
                            <FiFilter size={30} />
                            <select
                                onChange={handleChangeCategory}
                                value={categorySelected}>
                                <option
                                    key={'#'}>
                                    Tudo
                                </option>
                                {
                                    categories.map((item, index) => {
                                        return (
                                            <option
                                                key={item.id}>
                                                {item.name}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    {
                        products.length === 0 && (
                            <span className={styles.emptyList}>
                                Nenhum menu foi encontrado...
                            </span>
                        ) || (
                            <div className={styles.table}>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Item</th>
                                            <th
                                                className={styles.headNomeDescrição}>Nome e Descrição</th>
                                            <th>Preço</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            products.map(item => {
                                                const price = 'R$' + item.price + ',00';
                                                return (
                                                    <tr key={item.id}>
                                                        <td>
                                                            <img
                                                                className={styles.image}
                                                                src={imageUrl + item.banner}
                                                                alt="Imagem do produto"
                                                                width={250}
                                                                height={250} />
                                                        </td>
                                                        <td className={styles.nameDescription}>
                                                            <span className={styles.name}>{item.name}</span>
                                                            <span>{item.description}</span>
                                                        </td>
                                                        <td
                                                            className={styles.price}>
                                                            {price}
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        )
                    }
                    <span className={styles.total}>Total: {products.length}</span>
                </main>
                <Footer />
            </div >
        </>
    )
}