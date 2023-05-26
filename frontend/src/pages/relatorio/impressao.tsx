import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import moment from 'moment';

function impressao(peyments, date_from, date_to, typePayment) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    const reportTitle = [
        {
            text: 'Uni Pizza - Relatório de Vendas' + (typePayment === 'Pagamento' ? '' : (' - ' + typePayment)) + ' - (' + moment(date_from).format('DD/MM/YYYY') + ' - ' + moment(date_to).format('DD/MM/YYYY') + ')',
            fontSize: 25,
            bold: true,
            margin: [15, 20, 0, 45], // left, top, right, bottom
        }
    ];

    let total = 0;

    const dados = peyments.map((item) => {
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
                text: 'Valor Total: R$' + total + ',00     -     Página ' + currentPage + ' de ' + pageCount,
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

    pdfMake.createPdf(docDefinitions).download('Relatório_de_Vendas_' + (typePayment === 'Pagamento' ? '' : (typePayment + '_')) + moment(date_from).format('DD-MM-YYYY') + '_' + moment(date_to).format('DD-MM-YYYY'));
}

export default impressao;