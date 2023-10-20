import { InfoPage } from "components/info-page/info-page";

export default function Politics() {
    return (
        <div className="flex justify-center bg-[#f8f6f7] my-4 max-md:px-4">
            <InfoPage title="Remarcação/Alteração">
                <h2 className="text-bold text-lg">
                    O procedimento de solicita&ccedil;&atilde;o de remarca&ccedil;&atilde;o/altera&ccedil;&atilde;o
                    depende das regras do bilhete adquirido. Para verificar se seu voo &eacute; eleg&iacute;vel para
                    esse procedimento, favor entrar em contato com nossa equipe atrav&eacute;s do email ou WhatsApp.
                </h2>

                <p>
                    &ldquo;Importante: a remarca&ccedil;&atilde;o est&aacute; sujeita a cobran&ccedil;a de taxas,
                    conforme regra da companhia a&eacute;rea&rdquo;.
                </p>

                <p>
                    {" "}
                    Cancelamento/Reembolso Para solicitar o cancelamento de um bilhete, o titular deve entrar em contato
                    atrav&eacute;s do email ou whatsapp, informando nome completo e o localizador da reserva.
                </p>

                <p>Como &eacute; estipulado o valor da multa?</p>

                <p>
                    O valor l&iacute;quido de reembolso &eacute; igual ao valor tarifa + taxas de embarque,
                    subtra&iacute;do do valor da multa cobrada. Como funciona o processo de cancelamento?
                </p>

                <h2 className="text-bold text-lg">
                    1. Solicita&ccedil;&otilde;es de cancelamentos feitas at&eacute; 31/12/2021 seguem as regras da Lei
                    n&ordm; 14.174 e, portanto, contam com a regra dos 12 meses para reembolso, contados a partir da
                    data do voo;
                </h2>

                <h2 className="text-bold text-lg">
                    2. Solicita&ccedil;&otilde;es de cancelamentos feitas a partir de 01/01/2022 seguem as regras
                    conforme Medida Provis&oacute;ria n&ordm; 1.101 da ANAC, que prev&ecirc; o reembolso at&eacute; 31
                    de dezembro de 2023.
                </h2>

                <p>O reembolso n&atilde;o &eacute; corrigido pelo INPC.</p>

                <p>
                    Em caso de recebimento de reembolso, o valor &eacute; creditado de acordo com a forma de pagamento
                    adotada no pedido:
                </p>

                <p>
                    1. Cart&atilde;o de cr&eacute;dito: em pedidos realizados via cart&atilde;o de cr&eacute;dito, o
                    valor referente ao reembolso &eacute; creditado para o mesmo cart&atilde;o utilizado na compra. O
                    prazo segue a Medida Provis&oacute;ria n&ordm; 1.101, de 21 de fevereiro de 2022.
                </p>

                <p>
                    2. Pix: para pedidos cancelados devido a n&atilde;o emiss&atilde;o do bilhete, o valor &eacute;
                    devolvido para a mesma conta utilizada no ato do pagamento em nossa plataforma.
                </p>

                <p>
                    3. Pix: para pedidos j&aacute; emitidos, o valor &eacute; reembolsado para a conta banc&aacute;ria
                    do titular pagante/cadastro. O prazo segue a Medida Provis&oacute;ria n&ordm; 1.101, de 21 de
                    fevereiro de 2022.
                </p>

                <p>
                    Como &eacute; feito o reembolso / estorno via Pix Os dados banc&aacute;rios fornecidos para
                    reembolso devem ser, da mesma titularidade do respons&aacute;vel pagante (quem realizou o pagamento
                    do pedido de compra), contendo:
                </p>

                <p>
                    Nome completo; CPF; Banco; Ag&ecirc;ncia; Conta: ( ) Corrente ( ) Poupan&ccedil;a; Foto do
                    comprovante de pagamento; C&oacute;digo do pedido da Cavok viagens. As informa&ccedil;&otilde;es
                    devem ser encaminhadas por email.
                </p>

                <p>
                    As taxas referentes &agrave; inclus&atilde;o de bagagens n&atilde;o s&atilde;o reembolsadas em caso
                    de cancelamento de bilhetes j&aacute; emitidos.
                </p>

                <p>
                    {" "}
                    Regras de cancelamento por Companhia A&eacute;rea O usu&aacute;rio declara conhecer e concordar com
                    o funcionamento das regras estipuladas acerca do cancelamento e reembolso dos bilhetes emitidos.
                </p>

                <p>
                    Cancelamento e Reembolso de compras de passagens a&eacute;reas a partir de 10/11/2022 Cancelamentos
                    solicitados em at&eacute; 22h da data da compra de passagem(ns) a&eacute;rea(s), com embarque
                    superior a 7 dias: reembolso integral da tarifa do bilhete+taxas de embarque. Cancelamento
                    solicitado pelo cliente (volunt&aacute;rio): tarifa n&atilde;o reembols&aacute;vel. Cancelamento
                    involunt&aacute;rio (companhia a&eacute;rea): Para voos com altera&ccedil;&atilde;o superior a 31
                    minutos (nacional) e 61 minutos (internacional) se eleg&iacute;vel, ap&oacute;s
                    aprova&ccedil;&atilde;o da companhia a&eacute;rea, ser&aacute; reembolsado. Se voc&ecirc; tiver
                    algum imprevisto e precisar cancelar a sua viagem, &eacute; importante que voc&ecirc; leia as
                    informa&ccedil;&otilde;es a seguir com aten&ccedil;&atilde;o. Confira todas as
                    condi&ccedil;&otilde;es do regulamento aqui. Cancelamento por motivos especiais
                    (&oacute;bito/doen&ccedil;a): se aprovado pela companhia a&eacute;rea, a tarifa
                    ser&aacute;&#160;reembolsada.
                </p>
            </InfoPage>
        </div>
    );
}
