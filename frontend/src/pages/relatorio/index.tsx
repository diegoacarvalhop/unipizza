import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { setupAPIClient } from '../../services/api';
import { canSSRAuth } from '../../utils/canSSRAuth';
import { Footer } from '../../components/Footer';
import Head from 'next/head';
import { Header } from '../../components/Header';
import { TableItemProps } from '../tables';
import { UserItemProps } from '../users';
import { FiDownload, FiFilter } from 'react-icons/fi';
import { InputReport } from '../../components/ui/Input';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import moment from 'moment';
import { toast } from 'react-toastify';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

type PaymentItemProps = {
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
    userList: UserItemProps[];
    tableList: TableItemProps[];
}

export default function Relatorio({ userList, tableList }: PaymentProps) {

    const [filterUsers, setFilterUser] = useState(userList || []);
    const [filterTables, setFilterTables] = useState(tableList || []);
    const [filterDateFrom, setFilterDateFrom] = useState('');
    const [filterDateTo, setFilterDateTo] = useState('');
    const [typesPaymentSelected, setTypesPaymentSelected] = useState(undefined);
    const [tablesSelected, setTablesSelected] = useState(undefined);
    const [usersSelected, setUsersSelected] = useState(undefined);

    let dateState = '';

    useEffect(() => {
        function getDates() {
            const date = new Date();
            const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

            dateState = date.getFullYear().toString() + '-' + months[date.getMonth()] + '-' + date.getDate().toString();

            setFilterDateFrom(dateState);
            setFilterDateTo(dateState);
        }
        getDates();
    }, []);

    const filterTypesPayment = [
        {
            id: 1,
            name: 'Dinheiro'
        },
        {
            id: 2,
            name: 'PIX'
        },
        {
            id: 3,
            name: 'Débito'
        },
        {
            id: 4,
            name: 'Crédito'
        }
    ];

    async function getPayments() {
        let table: TableItemProps = undefined;
        if (tablesSelected !== undefined) {
            for (let x = 0; x < filterTables.length; x++) {
                if (filterTables[x].number === tablesSelected.split(' ')[1]) {
                    table = filterTables[x];
                }
            }
        }

        let user: UserItemProps = undefined;
        if (usersSelected !== undefined) {
            for (let x = 0; x < filterUsers.length; x++) {
                if (filterUsers[x].name === usersSelected) {
                    user = filterUsers[x];
                }
            }
        }

        const data = {
            type_payment: typesPaymentSelected === 'Pagamento' ? undefined : typesPaymentSelected,
            table_id: table === undefined ? undefined : table.id,
            user_id: user === undefined ? undefined : user.id,
            date_from: filterDateFrom,
            date_to: filterDateTo
        }

        const apiClient = setupAPIClient();
        const response = await apiClient.post('/payments', data);

        if (response.data.length === 0) {
            toast.error('Não foi encontrado resultados para o filtro informado!', {
                theme: 'dark'
            });
            return;
        }

        impressao(response.data, filterDateFrom, filterDateTo, typesPaymentSelected);
    }

    function impressao(payments: PaymentItemProps[], date_from, date_to, typePayment) {
        pdfMake.vfs = pdfFonts.pdfMake.vfs;

        const reportTitle = [
            {
                text: 'Uni Pizza - Relatório de Vendas' + (typePayment === undefined || typePayment === 'Pagamento' ? '' : (' - ' + typePayment)) + ' - (' + moment(date_from).format('DD/MM/YYYY') + ' - ' + moment(date_to).format('DD/MM/YYYY') + ')',
                fontSize: 25,
                bold: true,
                margin: [15, 20, 0, 45], // left, top, right, bottom
            }
        ];

        let total = 0;

        const dados = payments.map((item) => {
            total = total + Number(item.total_amount);
            return [
                { text: item.user?.name, fontSize: 12, marginLeft: 4 },
                { text: 'Mesa' + ' ' + item.table.number, fontSize: 12, marginLeft: 4 },
                { text: item.amount_money === '' ? 'R$ 0,00' : 'R$ ' + item.amount_money + ',00', fontSize: 12, marginLeft: 4 },
                { text: item.amount_pix === '' ? 'R$ 0,00' : 'R$ ' + item.amount_pix + ',00', fontSize: 12, marginLeft: 4 },
                { text: item.amount_debit === '' ? 'R$ 0,00' : 'R$ ' + item.amount_debit + ',00', fontSize: 12, marginLeft: 4 },
                { text: item.amount_credit === '' ? 'R$ 0,00' : 'R$ ' + item.amount_credit + ',00', fontSize: 12, marginLeft: 4 },
                { text: moment(item.created_at).format('DD/MM/YYYY'), fontSize: 12, marginLeft: 4 },
                { text: item.total_amount === '' ? 'R$ 0,00' : 'R$ ' + item.total_amount + ',00', fontSize: 12, marginLeft: 4 },
            ]
        });

        const details = [
            {
                table: {
                    headerRows: 1,
                    widths: ['*', '*', '*', '*', '*', '*', '*', '*'],
                    body: [
                        [
                            { text: 'Usuário', bold: true, fontSize: 12, margin: [4, 40, 0, 10] },
                            { text: 'Mesa', bold: true, fontSize: 12, margin: [4, 40, 0, 10] },
                            { text: 'Dinheiro', bold: true, fontSize: 12, margin: [4, 40, 0, 10] },
                            { text: 'PIX', bold: true, fontSize: 12, margin: [4, 40, 0, 10] },
                            { text: 'Débito', bold: true, fontSize: 12, margin: [4, 40, 0, 10] },
                            { text: 'Crédito', bold: true, fontSize: 12, margin: [4, 40, 0, 10] },
                            { text: 'Data', bold: true, fontSize: 12, margin: [4, 40, 0, 10] },
                            { text: 'Valor', bold: true, fontSize: 12, margin: [4, 40, 0, 10] }
                        ],
                        ...dados
                    ]
                },
                layout: 'lightHorizontalLines' // headerLineOnly
            }
        ];

        function rodape(currentPage, pageCount) {
            return [
                {
                    text: 'Valor Total: R$ ' + total + ',00     -     Página ' + currentPage + ' de ' + pageCount,
                    alignment: 'right',
                    fontSize: 12,
                    bold: true,
                    margin: [0, 10, 20, 0] // left, top, right, bottom
                }
            ]
        }

        const docDefinitions = {
            pageSize: 'A4',
            pageMargins: [15, 50, 15, 40],
            pageOrientation: 'landscape',
            header: [reportTitle],
            content: [details],
            footer: rodape
        }

        pdfMake.createPdf(docDefinitions).open({}, window.open('', '_blank'));
        // pdfMake.createPdf(docDefinitions).download('Relatório_de_Vendas_' + (typePayment === 'Pagamento' ? '' : (typePayment + '_')) + moment(date_from).format('DD-MM-YYYY') + '_' + moment(date_to).format('DD-MM-YYYY'));
    }

    return (
        <>
            <Head>
                <title>Relatório de vendas - Uni Pizza</title>
            </Head>
            <div>
                <Header />
                <main className={styles.container}>
                    <h1>Relatório de Vendas</h1>
                    <div className={styles.containerHead}>
                        <div className={styles.filter}>
                            <FiFilter size={30} />
                            <select value={typesPaymentSelected} onChange={e => setTypesPaymentSelected(e.target.value)}>
                                <option
                                    key={undefined}>
                                    Pagamento
                                </option>
                                {
                                    filterTypesPayment.map((item, index) => (
                                        <option
                                            key={item.id}
                                            value={item.name}>{item.name}
                                        </option>
                                    ))
                                }
                            </select>
                            <FiFilter size={30} />
                            <select
                                onChange={e => setTablesSelected(e.target.value)}
                                value={tablesSelected}>
                                <option
                                    key={undefined}>
                                    Mesa
                                </option>
                                {
                                    filterTables.map((item, index) => {
                                        return (
                                            <option
                                                key={item.id}
                                                value={'Mesa ' + item.number}>
                                                Mesa {item.number}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                            <FiFilter size={30} />
                            <select
                                onChange={e => setUsersSelected(e.target.value)}
                                value={usersSelected}>
                                <option
                                    key={undefined}>
                                    Usuário
                                </option>
                                {
                                    filterUsers.map((item, index) => {
                                        return (
                                            <option
                                                key={item.id}
                                                value={item.name}>
                                                {item.name}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                            <span>De</span>
                            <InputReport
                                value={filterDateFrom}
                                onChange={(event) => setFilterDateFrom(event.target.value)}
                                type="date"
                            />
                            <span>Até</span>
                            <InputReport
                                value={filterDateTo}
                                onChange={(event) => setFilterDateTo(event.target.value)}
                                type="date"
                            />
                            <button
                                title="Baixar relatório"
                                className={styles.button}
                                onClick={getPayments}>
                                <FiDownload size={35} color='#3FFFA3' />
                            </button>
                        </div>
                    </div>
                </main>
                <Footer />
            </div >
        </>
    );
}

export const getServerSideProps = canSSRAuth(async (context) => {
    const apiClient = setupAPIClient(context);
    const responseTables = await apiClient.get('/tables');
    const responseUsers = await apiClient.get('/users');
    return {
        props: {
            userList: responseUsers.data,
            tableList: responseTables.data
        }
    }
});