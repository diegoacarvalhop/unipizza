import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { setupAPIClient } from '../../services/api';
import { canSSRAuth } from '../../utils/canSSRAuth';
import impressao from './impressao';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export type PaymentItemProps = {
    id: string;
    total_amount: string;
    amount_paid: string;
    amount_pix: string;
    amount_money: string;
    amount_debit: string;
    amount_credit: string;
    created_at: Date;
    user: {
        name: string;
    };
    table: {
        number: string;
    }
}

interface PaymentProps {
    paymentList: PaymentItemProps[];
}

export default function Relatorio({ paymentList }: PaymentProps) {

    const [payments, setPayments] = useState(paymentList || []);

    const visualizarImpressao = async () => {
        impressao(payments);
    }

    return (
        <div className={styles.relatorio}>
            <header className={styles.header}>
                <p>
                    Relatório de Vendas
                </p>
            </header>
            <section className={styles.body}>
                <button className={styles.btn}
                    onClick={visualizarImpressao}>
                    Visualizar Relatório
                </button>

            </section>
        </div>
    );
}

export const getServerSideProps = canSSRAuth(async (context) => {
    const apiClient = setupAPIClient(context);
    const response = await apiClient.get('/payments');
    return {
        props: {
            paymentList: response.data
        }
    }
});