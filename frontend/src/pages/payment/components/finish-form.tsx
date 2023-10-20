import { Button, ButtonGroup, Checkbox, Divider, FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { PayerTypeEnum } from "enums/payer-type";
import { PaymentModeEnum } from "enums/payment-mode";
import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { IoMdArrowDropdown as DropdownIcon } from "react-icons/io";
import { LuBackpack as BackPackIcon } from "react-icons/lu";
import { LiaSuitcaseRollingSolid as LittleSuitcaseIcon } from "react-icons/lia";
//import { PiSuitcaseRollingDuotone as BigSuitcaseIcon } from "react-icons/pi";
import { RiSuitcase3Line as SuitcaseIcon } from "react-icons/ri";
import { PiSuitcaseRollingBold as BigSuitcaseIcon } from "react-icons/pi";
import Cards from "react-credit-cards";
import InputMask from "react-input-mask";
import { validateName } from "utils/validate-name";

interface CardInfo {
    cvc: string;
    expiry: string;
    focus: string;
    name: string;
    number: string;
}

export function FinishForm() {
    const [paymentMode, setPaymentMode] = useState<PaymentModeEnum>(PaymentModeEnum.pix);
    const [payerType, setPayerType] = useState<PayerTypeEnum>(PayerTypeEnum.person);
    const [termsAndConditions, setTermsAndConditions] = useState<boolean>(false);
    //const passengersCount = [1, 2, 3, 4, 5, 6, 7, 8];
    const passengersCount = [1];
    const [hasBackPack, setHasBackPack] = useState<boolean>(true);
    const [hasLittleSuitcase, setHasLittleSuitcase] = useState<boolean>(true);
    const [bigSuitcaseCount, setBigSuitcaseCount] = useState<number>(0);
    const [hasBack, setHasBack] = useState<boolean>(true);
    const [cardInfo, setCardInfo] = useState<CardInfo>({
        cvc: "",
        expiry: "",
        focus: "",
        name: "",
        number: "",
    });

    const handlePaymentModeChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const target = evt.target as HTMLInputElement;
        setPaymentMode(target.value as PaymentModeEnum);
    };

    const handlePayerTypeChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const target = evt.target as HTMLInputElement;
        setPayerType(target.value as PayerTypeEnum);
    };

    const handleRemoveBigSuitcase = () => {
        if (bigSuitcaseCount > 0) {
            setBigSuitcaseCount(bigSuitcaseCount - 1);
        }
    };

    const handleAddBigSuitcase = () => {
        setBigSuitcaseCount(bigSuitcaseCount + 1);
    };

    const handleCardInputFocus = (e: any) => {
        setCardInfo({ ...cardInfo, focus: e.target.name });
    };

    const handleCardInputChange = (e: any) => {
        const { name, value } = e.target;

        console.log(name, value);

        if (name === "name") {
            console.log("is name");
            if (!validateName(value)) {
                return;
            }
        }

        if (name == "expiry") {
            console.log("is expiry");
            console.log("value", value);  
            console.log("value.length", value.length); 
        }

        setCardInfo({ ...cardInfo, [name]: value });
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
                            <TextField fullWidth label="CPF OU PASSAPORTE" variant="outlined" />
                            <DatePicker label="Nascimento" format="DD/MM/YYYY" />
                        </div>
                        <Accordion className="shadow-xl">
                            <AccordionSummary
                                expandIcon={<DropdownIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                sx={{
                                    backgroundColor: "#ddeeff",
                                    //color: "white",
                                }}
                            >
                                <h3 className="text-bold">Dados da Bagagem</h3>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className="flex flex-col p-2 gap-2">
                                    <h3 className="font-bold">IDA</h3>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex flex-row justify-between">
                                            <div className="flex flex-row items-center gap-2">
                                                <BackPackIcon color={hasBackPack ? "green" : ""} /> Inclui 1 item
                                                pessoal.
                                                <br />
                                                <span className="text-silver"></span>
                                            </div>
                                        </div>
                                        <div className="flex flex-row justify-between">
                                            <div className="flex flex-row items-center gap-2 justify-start">
                                                <SuitcaseIcon color={hasLittleSuitcase ? "green" : ""} /> Inclui 1 mala
                                                de mão.
                                            </div>
                                        </div>
                                        <div className="flex flex-row justify-between">
                                            <div className="flex flex-row items-center gap-2">
                                                {bigSuitcaseCount > 0 ? (
                                                    <>
                                                        <BigSuitcaseIcon color="green" />{" "}
                                                        {`Inclui ${bigSuitcaseCount} mala${
                                                            bigSuitcaseCount > 1 ? "s" : ""
                                                        } de 23kg.`}
                                                    </>
                                                ) : (
                                                    <>
                                                        <BigSuitcaseIcon /> {"Não inclui mala de 23kg."}
                                                    </>
                                                )}
                                                <span className="text-silver">{"(50 reais.)"}</span>
                                            </div>
                                            <ButtonGroup
                                                variant="outlined"
                                                size="small"
                                                aria-label="outlined button group"
                                            >
                                                <Button
                                                    disabled={bigSuitcaseCount === 0}
                                                    onClick={handleRemoveBigSuitcase}
                                                >
                                                    -
                                                </Button>
                                                <Button onClick={handleAddBigSuitcase}>+</Button>
                                            </ButtonGroup>
                                        </div>
                                    </div>
                                </div>

                                {hasBack && (
                                    <>
                                        <br />
                                        <Divider />
                                        <br />
                                        <div className="flex flex-col p-2 gap-2">
                                            <h3 className="font-bold">VOLTA</h3>
                                            <div className="flex flex-col gap-2">
                                                <div className="flex flex-row justify-between">
                                                    <div className="flex flex-row items-center gap-2">
                                                        <BackPackIcon color={hasBackPack ? "green" : ""} /> Inclui 1
                                                        item pessoal.
                                                        <br />
                                                        <span className="text-silver"></span>
                                                    </div>
                                                </div>
                                                <div className="flex flex-row justify-between">
                                                    <div className="flex flex-row items-center gap-2 justify-start">
                                                        <SuitcaseIcon color={hasLittleSuitcase ? "green" : ""} /> Inclui
                                                        1 mala de mão.
                                                    </div>
                                                </div>
                                                <div className="flex flex-row justify-between">
                                                    <div className="flex flex-row items-center gap-2">
                                                        {bigSuitcaseCount > 0 ? (
                                                            <>
                                                                <BigSuitcaseIcon color="green" />{" "}
                                                                {`Inclui ${bigSuitcaseCount} mala${
                                                                    bigSuitcaseCount > 1 ? "s" : ""
                                                                } de 23kg.`}
                                                            </>
                                                        ) : (
                                                            <>
                                                                <BigSuitcaseIcon /> {"Não inclui mala de 23kg."}
                                                            </>
                                                        )}
                                                        <span className="text-silver">{"(50 reais.)"}</span>
                                                    </div>
                                                    <ButtonGroup
                                                        variant="outlined"
                                                        size="small"
                                                        aria-label="outlined button group"
                                                    >
                                                        <Button
                                                            disabled={bigSuitcaseCount === 0}
                                                            onClick={handleRemoveBigSuitcase}
                                                        >
                                                            -
                                                        </Button>
                                                        <Button onClick={handleAddBigSuitcase}>+</Button>
                                                    </ButtonGroup>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </AccordionDetails>
                        </Accordion>
                    </div>
                </div>
            ))}

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
                            <div className="flex flex-row gap-6 items-center">
                                <Cards
                                    cvc={cardInfo.cvc}
                                    expiry={cardInfo.expiry}
                                    focused={cardInfo.focus}
                                    name={cardInfo.name}
                                    number={cardInfo.number}
                                />
                                <div className="flex flex-col w-4/5 gap-4">
                                    <InputMask
                                        mask="9999 9999 9999 9999"
                                        onChange={handleCardInputChange}
                                        onFocus={handleCardInputFocus}
                                    >
                                        <TextField label="Numero" variant="outlined" name="number" />
                                    </InputMask>
                                    <TextField
                                        name="name"
                                        onChange={handleCardInputChange}
                                        label="Nome do titular (Como no Cartão)"
                                        variant="outlined"
                                        onFocus={handleCardInputFocus}
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <InputMask onChange={handleCardInputChange} onFocus={handleCardInputFocus} mask={[/\d/, /\d/, '/', /\d/, /\d/]}>
                                            <TextField type="tel" name="expiry" label="Validade (MM/YY)" variant="outlined" />
                                        </InputMask>
                                        <TextField
                                            name="cvc"
                                            onChange={handleCardInputChange}
                                            onFocus={handleCardInputFocus}
                                            label="CVC (Codigo de Segurança)"
                                            variant="outlined"
                                            inputProps={{
                                                pattern: "d{3}",
                                            }}
                                        />
                                    </div>
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
