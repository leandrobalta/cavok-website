import { Button, Checkbox, Divider, FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { PayerTypeEnum } from "enums/payer-type";
import { PaymentModeEnum } from "enums/payment-mode";
import { useState } from "react";

export function FinishForm() {
    const [paymentMode, setPaymentMode] = useState<PaymentModeEnum>(PaymentModeEnum.pix);
    const [payerType, setPayerType] = useState<PayerTypeEnum>(PayerTypeEnum.person);
    const [termsAndConditions, setTermsAndConditions] = useState<boolean>(false);
    //const passengersCount = [1, 2, 3, 4, 5, 6, 7, 8];
    const passengersCount = [1];

    const handlePaymentModeChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const target = evt.target as HTMLInputElement;
        setPaymentMode(target.value as PaymentModeEnum);
    };

    const handlePayerTypeChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const target = evt.target as HTMLInputElement;
        setPayerType(target.value as PayerTypeEnum);
    };

    return (
        <div className="flex flex-col gap-4 [h2]:text-lg">
            <a href="/search" className="text-[#134085] text-start">
                Voltar
            </a>
            <h1 className="text-bold text-start text-xl">
                Está quase acabando! Basta completar os seus dados e finalizar a compra
            </h1>
            {passengersCount.map((value) => (
                <div className="flex flex-col gap-4 border-black bg-white p-4 rounded-lg text-start shadow-xl">
                    <div className="flex flex-col gap-4">
                        <h2 className="text-bold">Dados do passageiro {value}</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <TextField fullWidth label="Primeiro nome" variant="outlined" />
                            <TextField fullWidth label="Sobrenome" variant="outlined" />
                            <TextField fullWidth label="Email" variant="outlined" />
                            <TextField fullWidth label="Telefone" variant="outlined" />
                            <TextField fullWidth label="CPF" variant="outlined" />
                            <DatePicker />
                        </div>
                    </div>
                </div>
            ))}

            {/* bagagem section */}

            <div className="flex flex-col gap-4 border-black bg-white p-4 rounded-lg text-start shadow-xl">
                <div className="flex flex-col gap-4">
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
                            <div className="flex flex-col gap-4">
                                <h2 className="text-bold">Cartão de crédito</h2>
                                <div className="flex flex-row gap-4">
                                    <TextField fullWidth label="Número do cartão" variant="outlined" />
                                    <TextField fullWidth label="Email" variant="outlined" />
                                </div>
                                <div className="flex flex-row gap-4">
                                    <TextField fullWidth label="Validade" variant="outlined" />
                                    <TextField fullWidth label="CVV" variant="outlined" />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-4 border-black bg-white p-4 rounded-lg text-start shadow-xl">
                <div className="flex flex-col gap-4">
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
                            <div className="flex flex-col gap-4">
                                <h2 className="text-bold">Pessoa Fisica</h2>
                                <div className="flex flex-row gap-4">
                                    <TextField fullWidth label="Nome completo" variant="outlined" />
                                    <TextField fullWidth label="CPF" variant="outlined" />
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <Divider />
                            <div className="flex flex-col gap-4">
                                <h2 className="text-bold">Pessoa Juridica</h2>
                                <div className="flex flex-row gap-4">
                                    <TextField fullWidth label="Razão Social" variant="outlined" />
                                    <TextField fullWidth label="CNPJ" variant="outlined" />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* material ui checkbox to check if the person aprove the terms and conditions of cavok viagens, only if this checkbox is checked the consumer can finish the payment */}
            <FormControlLabel
                control={<Checkbox />}
                label={`Li e concordo com os termos e condições da Cavok Viagens`}
                value={termsAndConditions}
                onChange={(evt) => {
                    const target = evt.target as HTMLInputElement;
                    setTermsAndConditions(target.checked);
                }}
            />

            <Button disabled={!termsAndConditions} variant="contained" color="primary" className="w-full">
                Finalizar compra
            </Button>
            <br />
        </div>
    );
}
