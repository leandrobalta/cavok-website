import { Divider, FormControlLabel, Radio, RadioGroup } from "@mui/material";

export function FinishForm() {
    return (
        <div className="flex flex-col gap-4">
            <a href="/search" className="text-[#134085] text-start">
                Voltar
            </a>
            <h1 className="text-bold">Está quase acabando! Basta completar os seus dados e finalizar a compra</h1>
            <div className="flex flex-col gap-2 border-black bg-white p-4 rounded-lg text-start">
                <div>
                    <h2 className="text-bold">Formas de pagamento</h2>
                    <RadioGroup className="px-2">
                        <FormControlLabel
                            className=""
                            control={<Radio />}
                            label={"Cartão de crédito"}
                            onClick={(evt) => {
                                console.log(evt);
                            }}
                        />
                        <FormControlLabel
                            className=""
                            control={<Radio />}
                            label={"Pix"}
                            onClick={(evt) => {
                                console.log(evt);
                            }}
                        />
                    </RadioGroup>
                </div>
                <Divider />
                <div></div>
            </div>
        </div>
    );
}
