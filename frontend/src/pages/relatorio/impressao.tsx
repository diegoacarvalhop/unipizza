import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

function impressao(peyments) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    const reportTitle = [
        {
            text: 'Vendas',
            fontSize: 15,
            bold: true,
            margin: [15, 20, 0, 45] // left, top, right, bottom
        }
    ];

    const dados = peyments.map((item) => {
        return [
            { text: 'Mesa' + ' ' + item.table.number, fontSize: 8 },
            { text: item.amount_money === '' ? 'R$ 0,00' : 'R$ ' + item.amount_money + ',00', fontSize: 8 },
            { text: item.amount_pix === '' ? 'R$ 0,00' : 'R$ ' + item.amount_pix + ',00', fontSize: 8 },
            { text: item.amount_debit === '' ? 'R$ 0,00' : 'R$ ' + item.amount_debit + ',00', fontSize: 8 },
            { text: item.amount_credit === '' ? 'R$ 0,00' : 'R$ ' + item.amount_credit + ',00', fontSize: 8 },
            { text: dateFormat(item.created_at), fontSize: 8 },
            { text: item.total_amount === '' ? 'R$ 0,00' : 'R$ ' + item.total_amount + ',00', fontSize: 8 },
            { text: item.user?.name, fontSize: 8 },
        ]
    });

    function dateFormat(date) {
        var ano = date.split("-")[0];
        var mes = date.split("-")[1];
        var dia = date.split("-")[2];
        dia = dia.split('T')[0];

        return dia + '/' + mes + '/' + ano;
    }

    const details = [
        {
            table: {
                headerRows: 1,
                widths: ['*', '*', '*', '*', '*', '*', '*', '*'],
                body: [
                    [
                        { text: 'Mesa', bold: true, fontSize: 9, margin: [4, 4, 0, 0] },
                        { text: 'Dinheiro', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
                        { text: 'PIX', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
                        { text: 'Débito', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
                        { text: 'Crédito', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
                        { text: 'Data', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
                        { text: 'Valor Total', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
                        { text: 'Usuário', bold: true, fontSize: 9, margin: [0, 4, 0, 0] }
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
                text: currentPage + ' / ' + pageCount,
                alignment: 'right',
                fontSize: 9,
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

    pdfMake.createPdf(docDefinitions).download();
}

export default impressao;