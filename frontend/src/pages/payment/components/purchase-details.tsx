import { Divider } from "@mui/material"

const result = {
    price: 100,
    tax: 10,
    total: 110
}

export function PurchaseDetails() {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 bg-white shadow-lg rounded p-4">
                <h2 className="text-bold text-start text-xl">Detalhes da compra</h2>
                <div className="flex flex-col gap-2 [&>p]:flex [&>p]:flex-row [&>p]:justify-between">
                    <p>
                        <span className="text-bold">Adulto: </span>
                        <span className="text-silver mr-0">R${result.price}</span>
                    </p>
                    <p>
                        <span className="text-bold">Taxa de embarque:</span>
                        <span className="text-silver">R${result.tax}</span>
                    </p>
                    <p>
                        <span className="text-bold">Impostos e encargos:</span>
                        <span className="text-silver">R${result.tax}</span>
                    </p>
                    <Divider />
                        {/* <p className="text-[#134085]"> */}
                        <p className="text-bold text-[#113763] text-lg">
                            <span>VALOR TOTAL:</span>
                            <span>R$ {result.price + result.tax}</span>
                        </p>
                    <Divider />
                </div>
            </div>

            <div className="flex flex-col gap-4 bg-white shadow-lg rounded p-4">
                <h2 className="text-bold text-start text-xl">Detalhes da passagem</h2>
                <div className="flex flex-col text-start p-4 gap-4">
                    <div>
                        <h3 className="text-bold">Ida</h3>
                        <p>São Paulo (GRU) - Rio de Janeiro (GIG)</p>
                        <p className="text-silver">Segunda, 14 de Março de 2022</p>
                        <p className="text-silver">Adulto</p>
                    </div>
                    <Divider />
                    <div>
                        <h3 className="text-bold">Volta</h3>
                        <p>Rio de Janeiro (GIG) - São Paulo (GRU)</p>
                        <p className="text-silver">Segunda, 14 de Março de 2022</p>
                        <p className="text-silver">Adulto</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
    