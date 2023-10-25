import { InfoPage } from "components/info-page/info-page";

export default function About() {
    return (
        <div className="flex justify-center bg-[#f8f6f7] my-4 max-md:px-4">
            <InfoPage title="Quem Somos">
                <h2 className="text-bold text-lg">Bem-vindo &agrave; Cavok Viagens - Sua Rota para o Mundo!</h2>

                <p>
                    Fundada em janeiro de 2022, somos uma ag&ecirc;ncia de viagens online dedicada exclusivamente
                    &agrave; facilita&ccedil;&atilde;o de experi&ecirc;ncias a&eacute;reas inesquec&iacute;veis. Com um
                    profundo compromisso com a excel&ecirc;ncia e a satisfa&ccedil;&atilde;o do cliente, nosso objetivo
                    &eacute; tornar cada viagem uma jornada suave e memor&aacute;vel.
                </p>

                <h2 className="text-bold text-lg">Nossa Miss&atilde;o</h2>

                <p>
                    Nosso prop&oacute;sito &eacute; proporcionar a todos os viajantes acesso simplificado e
                    acess&iacute;vel a um vasto mundo de destinos. Atrav&eacute;s de parcerias estrat&eacute;gicas com
                    as principais companhias a&eacute;reas e uma plataforma intuitiva, estamos empenhados em oferecer um
                    servi&ccedil;o eficiente e personalizado.
                </p>

                <h2 className="text-bold text-lg">O que Oferecemos</h2>

                <p>
                    Ampla Sele&ccedil;&atilde;o de Destinos: Oferecemos uma ampla gama de op&ccedil;&otilde;es de
                    destinos, cobrindo todos os continentes e atendendo a uma variedade de interesses e
                    prefer&ecirc;ncias.
                </p>

                <p>
                    Tarifas Competitivas: Trabalhamos incansavelmente para garantir que nossos clientes obtenham as
                    melhores tarifas dispon&iacute;veis, sem comprometer a qualidade do servi&ccedil;o.
                </p>

                <p>
                    Experi&ecirc;ncia Intuitiva: Nossa plataforma foi projetada com foco na facilidade de uso,
                    permitindo que os viajantes encontrem e reservem passagens com rapidez e efici&ecirc;ncia.
                </p>

                <p>
                    Atendimento ao Cliente Excepcional: Nossa equipe altamente qualificada est&aacute; pronta para
                    oferecer suporte e assist&ecirc;ncia em todas as etapas da jornada do cliente.
                </p>

                <h2 className="text-bold text-lg">Nossa Vis&atilde;o para o Futuro</h2>

                <p>
                    Continuaremos a inovar e aprimorar nossos servi&ccedil;os, mantendo sempre o foco na
                    satisfa&ccedil;&atilde;o do cliente e na promo&ccedil;&atilde;o de experi&ecirc;ncias de viagem
                    excepcionais. Almejamos ser a ag&ecirc;ncia de viagens a&eacute;reas de refer&ecirc;ncia para os
                    viajantes que buscam confiabilidade, conveni&ecirc;ncia e excel&ecirc;ncia.
                </p>

                <h2 className="text-bold text-lg">Junte-se a n&oacute;s nesta jornada e permita-nos ser seu companheiro de viagem confi&aacute;vel.</h2>
            </InfoPage>
        </div>
    );
}
