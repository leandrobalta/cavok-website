import { Divider, FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
import { PayerTypeEnum } from "enums/payer-type";
import { PaymentModeEnum } from "enums/payment-mode";
import { useState } from "react";

export function FinishForm() {
    const [paymentMode, setPaymentMode] = useState<PaymentModeEnum>(PaymentModeEnum.pix);
    const [payerType, setPayerType] = useState<PayerTypeEnum>(PayerTypeEnum.person);

    const handlePaymentModeChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const target = evt.target as HTMLInputElement;
        setPaymentMode(target.value as PaymentModeEnum);
    };

    const handlePayerTypeChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const target = evt.target as HTMLInputElement;
        setPayerType(target.value as PayerTypeEnum);
    };

    return (
        <div className="flex flex-col gap-4">
            <a href="/search" className="text-[#134085] text-start">
                Voltar
            </a>
            <h1 className="text-bold text-start">Está quase acabando! Basta completar os seus dados e finalizar a compra</h1>
            <div className="flex flex-col gap-2 border-black bg-white p-4 rounded-lg text-start">
                <div className="flex flex-col gap-2">
                    <h2 className="text-bold">Formas de pagamento</h2>
                    <RadioGroup className="px-2" defaultValue={PaymentModeEnum.pix} name="payment-mode">
                        <FormControlLabel
                            value={PaymentModeEnum.credit}
                            className=""
                            control={<Radio />}
                            label={"Cartão de crédito"}
                            onChange={(evt) => {
                                handlePaymentModeChange(evt as any);
                            }}
                        />
                        <FormControlLabel
                            value={PaymentModeEnum.pix}
                            className=""
                            control={<Radio />}
                            label={"Pix"}
                            onChange={(evt) => {
                                handlePaymentModeChange(evt as any);
                            }}
                        />
                        {/* <FormControlLabel
                            value="bank-slip"
                            className=""
                            control={<Radio />}
                            label={"Boleto Bancário"}
                            onClick={(evt) => {
                                console.log(evt);
                            }}
                        /> */}
                    </RadioGroup>
                    {paymentMode === PaymentModeEnum.credit && (
                        <>
                            <Divider />
                            <div className="flex flex-col gap-2">
                                <h2 className="text-bold">Cartão de crédito</h2>
                                <div className="flex flex-row gap-2">
                                    <TextField fullWidth label="Número do cartão" variant="outlined" />
                                    <TextField fullWidth label="Email" variant="outlined" />
                                </div>
                                <div className="flex flex-row gap-2">
                                    <TextField fullWidth label="Validade" variant="outlined" />
                                    <TextField fullWidth label="CVV" variant="outlined" />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>


            <div className="flex flex-col gap-2 border-black bg-white p-4 rounded-lg text-start">
                <div className="flex flex-col gap-2">
                    <h2 className="text-bold">Detalhes do pagador</h2>
                    <RadioGroup className="px-2" defaultValue={PayerTypeEnum.person} name="payer-type">
                        <FormControlLabel
                            value={PayerTypeEnum.person}
                            className=""
                            control={<Radio />}
                            label={"Pessoa Fisica"}
                            onChange={(evt) => {
                                handlePayerTypeChange(evt as any);
                            }}
                        />
                        <FormControlLabel
                            value={PayerTypeEnum.company}
                            className=""
                            control={<Radio />}
                            label={"Pessoa Juridica"}
                            onChange={(evt) => {
                                handlePayerTypeChange(evt as any);
                            }}
                        />
                        {/* <FormControlLabel
                            value="bank-slip"
                            className=""
                            control={<Radio />}
                            label={"Boleto Bancário"}
                            onClick={(evt) => {
                                console.log(evt);
                            }}
                        /> */}
                    </RadioGroup>
                    {payerType === PayerTypeEnum.person ? (
                        <>
                            <Divider />
                            <div className="flex flex-col gap-2">
                                <h2 className="text-bold">Pessoa Fisica</h2>
                                <div className="flex flex-row gap-2">
                                    <TextField fullWidth label="Nome completo" variant="outlined" />
                                    <TextField fullWidth label="CPF" variant="outlined" />
                                </div>
                            </div>
                        </>
                    ) :
                    (
                        <>
                            <Divider />
                            <div className="flex flex-col gap-2">
                                <h2 className="text-bold">Pessoa Juridica</h2>
                                <div className="flex flex-row gap-2">
                                    <TextField fullWidth label="Razão Social" variant="outlined" />
                                    <TextField fullWidth label="CNPJ" variant="outlined" />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
