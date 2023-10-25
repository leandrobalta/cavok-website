import { InfoPage } from "components/info-page/info-page";

export default function Doubts() {
    return (
        <div className="flex justify-center bg-[#f8f6f7] my-4 max-md:px-4">
            <InfoPage title="Dúvidas Frequentes">
                <h2 className="text-bold text-lg">1- Documenta&ccedil;&atilde;o para viagem:</h2>

                <p>
                    &Eacute; imprescind&iacute;vel que esteja portando um documento de identifica&ccedil;&atilde;o com
                    foto v&aacute;lido, sendo aceitos RG, CNH ou passaporte como formas de identifica&ccedil;&atilde;o.
                </p>

                <h2 className="text-bold text-lg">2- Check-in:</h2>

                <p>
                    Para sua comodidade, informamos que a equipe da Cavok Viagens realizar&aacute; o seu check-in e
                    providenciar&aacute; o envio do cart&atilde;o de embarque at&eacute; 24 horas antes do
                    hor&aacute;rio de partida.
                </p>

                <h2 className="text-bold text-lg">3- Recomenda&ccedil;&atilde;o de anteced&ecirc;ncia:</h2>

                <p>
                    Sugerimos que, para voos nacionais, chegue ao aeroporto com uma anteced&ecirc;ncia m&iacute;nima de
                    2 horas para garantir tempo suficiente para procedimentos de seguran&ccedil;a e embarque. Para voos
                    internacionais 4 horas de anteced&ecirc;ncia.
                </p>

                <h2 className="text-bold text-lg">4- Pol&iacute;tica de Bagagem:</h2>

                <p>
                    Solicitamos sua aten&ccedil;&atilde;o para a pol&iacute;tica de bagagem estabelecida pela companhia
                    a&eacute;rea, a fim de garantir uma experi&ecirc;ncia de viagem sem contratempos. &Eacute; crucial
                    observar as dimens&otilde;es, pesos permitidos e itens proibidos.
                </p>

                <h2 className="text-bold text-lg">Para sua conveni&ecirc;ncia, aqui est&atilde;o alguns detalhes:</h2>

                <p>
                    Item Pessoal: Um item pessoal, como mochila ou bolsa, &eacute; permitido a bordo. Mala de
                    M&atilde;o: Uma mala de m&atilde;o pode ser levada consigo na cabine. Por favor, assegure-se de que
                    n&atilde;o exceda 10kg. Bagagem Despachada: Caso necessite despachar uma mala, esse servi&ccedil;o
                    pode ser adquirido durante o processo de pagamento em nosso site. A bagagem despachada n&atilde;o
                    deve ultrapassar 23kg. Em caso de excesso de peso, uma taxa adicional ser&aacute; aplicada.
                </p>

                <p>
                    Recomendamos cuidado especial ao preparar sua bagagem para evitar surpresas desagrad&aacute;veis
                    durante o embarque.
                </p>

                <p>
                    Para informa&ccedil;&otilde;es mais detalhadas sobre pol&iacute;ticas espec&iacute;ficas de bagagem
                    da companhia a&eacute;rea que voc&ecirc; escolheu, favor visitar o site oficial da mesma.
                </p>

                <p>
                    Caso persista alguma d&uacute;vida, n&atilde;o hesite em entrar em contato conosco atrav&eacute;s do
                    WhatsApp (12) 99757-8780 ou pelo e-mail cavokcontato@gmail.com
                </p>
            </InfoPage>
        </div>
    );
}
