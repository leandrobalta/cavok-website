import {
    Button,
    ButtonGroup,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    SelectChangeEvent,
    TextField,
} from "@mui/material";
import { DatePicker, MobileDatePicker } from "@mui/x-date-pickers";
import { PayerTypeEnum } from "enums/payer-type";
import { PaymentModeEnum } from "enums/payment-mode";
import { useEffect, useState } from "react";
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
import useWindowDimensions from "hooks/window-dimensions";

interface CardInfo {
    cvc: string;
    expiry: string;
    focus: string;
    name: string;
    number: string;
}

export function FinishForm() {
    const { width } = useWindowDimensions();

    const [isInternational, setIsInternational] = useState<boolean>(true);
    const [cvcMask, setCvcMask] = useState<"999" | "9999">("999");
    const [paymentMode, setPaymentMode] = useState<PaymentModeEnum>(PaymentModeEnum.pix);
    const [payerType, setPayerType] = useState<PayerTypeEnum>(PayerTypeEnum.person);
    const [termsAndConditions, setTermsAndConditions] = useState<boolean>(false);
    const [payerGender, setPayerGender] = useState<"male" | "female">("male");
    const passengersCount = [1];
    const [hasBackPack, setHasBackPack] = useState<boolean>(true);
    const [hasLittleSuitcase, setHasLittleSuitcase] = useState<boolean>(true);
    const [outBigSuitcaseCount, setOutBigSuitcaseCount] = useState<number>(0);
    const [backBigSuitcaseCount, setBackBigSuitcaseCount] = useState<number>(0);
    const [hasBack, setHasBack] = useState<boolean>(true);
    const [cardExpiryValid, setCardExpiryValid] = useState<boolean>(true);
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

    const handleOutRemoveBigSuitcase = () => {
        if (outBigSuitcaseCount > 0) {
            setOutBigSuitcaseCount(outBigSuitcaseCount - 1);
        }
    };

    const handleOutAddBigSuitcase = () => {
        setOutBigSuitcaseCount(outBigSuitcaseCount + 1);
    };

    const handleBackRemoveBigSuitcase = () => {
        if (backBigSuitcaseCount > 0) {
            setBackBigSuitcaseCount(backBigSuitcaseCount - 1);
        }
    };

    const handleBackAddBigSuitcase = () => {
        setBackBigSuitcaseCount(backBigSuitcaseCount + 1);
    };

    const handleCardInputFocus = (e: any) => {
        setCardInfo({ ...cardInfo, focus: e.target.name });
    };

    const handleCardInputChange = (e: any) => {
        const { name, value } = e.target;

        if (name === "name") {
            if (!validateName(value)) {
                return;
            }
        }

        if (name === "cvc" && value.toString().lenght === 4){
            console.log("cvc value: ", value)
        }

        setCardInfo({ ...cardInfo, [name]: value });
    };

    const onPayerGenderChange = (event: SelectChangeEvent<string>) => {
        setPayerGender(event.target.value as any);
    };

    const checkCardExpiryValid = (date: string) => {
        const [month, year] = date.split("/");
        console.log("month", month);
        console.log("year", year);

        if (!month || !year) return;

        if (!month.includes("_") && !year.includes("_")) {
            const currentYear = new Date().getFullYear();
            const currentMonth = new Date().getMonth() + 1; // Mês atual é baseado em 1 (janeiro = 1, fevereiro = 2, etc.)

            const inputMonth = parseInt(month, 10);
            const inputYear = parseInt(`20${year}`, 10);

            if (
                inputMonth >= 1 &&
                inputMonth <= 12 &&
                (inputYear > currentYear || (inputYear === currentYear && inputMonth >= currentMonth))
            ) {
                setCardExpiryValid(true);
            } else {
                setCardExpiryValid(false);
            }
        }
    };

    useEffect(() => {
        checkCardExpiryValid(cardInfo.expiry);
    }, [cardInfo.expiry]);

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
                        <FormControlLabel
                            control={<Checkbox />}
                            label={"Voo internacional (apenas para teste)"}
                            checked={isInternational}
                            onChange={(evt) => {
                                const target = evt.target as HTMLInputElement;
                                setIsInternational(target.checked);
                            }}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <TextField fullWidth label="Primeiro nome" variant="outlined" />
                            <TextField fullWidth label="Sobrenome" variant="outlined" />
                            <TextField fullWidth label="Email" variant="outlined" />
                            <InputMask mask="(99) 99999-9999" maskChar={null}>
                                <TextField fullWidth label="Telefone" variant="outlined" />
                            </InputMask>
                            {isInternational ? (
                                <>
                                    <InputMask mask="aa999999" maskChar={null}>
                                        <TextField fullWidth label="Passaporte" variant="outlined" />
                                    </InputMask>
                                    <InputMask mask="99/99">
                                        <TextField
                                            label="Vencimento (MM/YY)"
                                            variant="outlined"
                                            error={!cardExpiryValid}
                                        />
                                    </InputMask>
                                </>
                            ) : (
                                <InputMask mask="999.999.999-99" maskChar={null}>
                                    <TextField fullWidth label="CPF" variant="outlined" />
                                </InputMask>
                            )}
                            {width > 820 ? (
                                <DatePicker label="Nascimento" format="DD/MM/YYYY" />
                            ) : (
                                <MobileDatePicker label="Nascimento" format="DD/MM/YYYY" />
                            )}
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
                                            <div className="flex flex-col items-center">
                                                {outBigSuitcaseCount > 0 ? (
                                                    <div className="flex flex-row items-center">
                                                        <BigSuitcaseIcon color="green" />{" "}
                                                        {`Inclui ${outBigSuitcaseCount} mala${
                                                            outBigSuitcaseCount > 1 ? "s" : ""
                                                        } de 23kg.`}
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-row items-center gap-2">
                                                        <BigSuitcaseIcon /> {"Não inclui mala de 23kg."}
                                                    </div>
                                                )}
                                                {!isInternational && (
                                                    <span className="w-full ml-12 text-silver text-start">
                                                        {"(50 reais.)"}
                                                    </span>
                                                )}
                                            </div>
                                            {!isInternational && (
                                                <ButtonGroup
                                                    variant="outlined"
                                                    size="small"
                                                    aria-label="outlined button group"
                                                    className="h-8"
                                                >
                                                    <Button
                                                        disabled={outBigSuitcaseCount === 0}
                                                        onClick={handleOutRemoveBigSuitcase}
                                                    >
                                                        -
                                                    </Button>
                                                    <Button onClick={handleOutAddBigSuitcase}>+</Button>
                                                </ButtonGroup>
                                            )}
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
                                                    <div className="flex flex-col items-center">
                                                        {backBigSuitcaseCount > 0 ? (
                                                            <div className="flex flex-row items-center">
                                                                <BigSuitcaseIcon color="green" />{" "}
                                                                {`Inclui ${backBigSuitcaseCount} mala${
                                                                    backBigSuitcaseCount > 1 ? "s" : ""
                                                                } de 23kg.`}
                                                            </div>
                                                        ) : (
                                                            <div className="flex flex-row items-center gap-2">
                                                                <BigSuitcaseIcon /> {"Não inclui mala de 23kg."}
                                                            </div>
                                                        )}
                                                        {!isInternational && (
                                                            <span className="w-full ml-12 text-silver text-start">
                                                                {"(50 reais.)"}
                                                            </span>
                                                        )}
                                                    </div>
                                                    {!isInternational && (
                                                        <ButtonGroup
                                                            variant="outlined"
                                                            size="small"
                                                            aria-label="outlined button group"
                                                            className="h-8"
                                                        >
                                                            <Button
                                                                disabled={backBigSuitcaseCount === 0}
                                                                onClick={handleBackRemoveBigSuitcase}
                                                            >
                                                                -
                                                            </Button>
                                                            <Button onClick={handleBackAddBigSuitcase}>+</Button>
                                                        </ButtonGroup>
                                                    )}
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
                            <div className="flex flex-row gap-6 items-center max-lg:flex-col">
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
                                        <TextField label="Número" variant="outlined" name="number" />
                                    </InputMask>
                                    <TextField
                                        name="name"
                                        onChange={handleCardInputChange}
                                        label="Nome do titular (Como no Cartão)"
                                        variant="outlined"
                                        onFocus={handleCardInputFocus}
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <InputMask
                                            onChange={handleCardInputChange}
                                            onFocus={handleCardInputFocus}
                                            mask="99/99"
                                        >
                                            <TextField
                                                type="tel"
                                                name="expiry"
                                                label="Validade (MM/YY)"
                                                variant="outlined"
                                                error={!cardExpiryValid}
                                            />
                                        </InputMask>
                                        <TextField
                                            type="number"
                                            onChange={handleCardInputChange}
                                            onFocus={handleCardInputFocus}
                                            name="cvc"
                                            label="CVV (Código de Segurança)"
                                            variant="outlined"
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
                            label={"Pessoa Física"}
                            onChange={(evt) => {
                                handlePayerTypeChange(evt as any);
                            }}
                        />
                        <FormControlLabel
                            value={PayerTypeEnum.company}
                            className=""
                            control={<Radio />}
                            label={"Pessoa Jurídica"}
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
                    <Divider />
                    {payerType === PayerTypeEnum.person ? (
                        <div className="flex flex-col gap-4">
                            <h2 className="text-bold">{"Pessoa Física"}</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <TextField fullWidth label="Nome completo" variant="outlined" />
                                <InputMask mask="999.999.999-99" maskChar={null}>
                                    <TextField fullWidth label="CPF" variant="outlined" />
                                </InputMask>
                                {width > 820 ? (
                                    <DatePicker label="Nascimento" format="DD/MM/YYYY" />
                                ) : (
                                    <MobileDatePicker label="Nascimento" format="DD/MM/YYYY" />
                                )}
                                <TextField fullWidth label="Email" variant="outlined" />
                                <InputMask mask="(99) 99999-9999" maskChar={null}>
                                    <TextField fullWidth label="Telefone" variant="outlined" />
                                </InputMask>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">{"Gênero"}</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Genero"
                                        onChange={onPayerGenderChange}
                                    >
                                        <MenuItem value="male">Masculino</MenuItem>
                                        <MenuItem value="female">Feminino</MenuItem>
                                    </Select>
                                </FormControl>
                                <InputMask mask="99.999-999">
                                    <TextField fullWidth label="CEP" variant="outlined" />
                                </InputMask>
                                <TextField fullWidth label="Endereço" variant="outlined" />
                                <TextField fullWidth label="Número" variant="outlined" />
                                <TextField fullWidth label="Complemento" variant="outlined" />
                                <TextField fullWidth label="Bairro" variant="outlined" />
                                <TextField fullWidth label="Cidade" variant="outlined" />
                                <TextField fullWidth label="Estado" variant="outlined" />
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            <h2 className="text-bold">{"Pessoa Jurídica"}</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <TextField fullWidth label="Nome completo do responsavél" variant="outlined" />
                                {width > 820 ? (
                                    <DatePicker label="Nascimento" format="DD/MM/YYYY" />
                                ) : (
                                    <MobileDatePicker label="Nascimento" format="DD/MM/YYYY" />
                                )}
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">{"Gênero"}</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Gênero"
                                        onChange={onPayerGenderChange}
                                    >
                                        <MenuItem value="male">Masculino</MenuItem>
                                        <MenuItem value="female">Feminino</MenuItem>
                                    </Select>
                                </FormControl>
                                <InputMask mask="999.999.999-99" maskChar={null}>
                                    <TextField fullWidth label="CPF do responsavel" variant="outlined" />
                                </InputMask>
                                <TextField fullWidth label="Email" variant="outlined" />
                                <TextField fullWidth label="Nome da empresa" variant="outlined" />
                                <TextField fullWidth label="Razão social" variant="outlined" />
                                <InputMask mask="99.999.999/9999-99" maskChar={null}>
                                    <TextField fullWidth label="CNPJ" variant="outlined" />
                                </InputMask>
                                <InputMask mask="(99) 99999-9999" maskChar={null}>
                                    <TextField fullWidth label="Telefone" variant="outlined" />
                                </InputMask>
                                <InputMask mask="99.999-999">
                                    <TextField fullWidth label="CEP" variant="outlined" />
                                </InputMask>
                                <TextField fullWidth label="Endereço" variant="outlined" />
                                <TextField fullWidth label="Número" variant="outlined" />
                                <TextField fullWidth label="Complemento" variant="outlined" />
                                <TextField fullWidth label="Bairro" variant="outlined" />
                                <TextField fullWidth label="Cidade" variant="outlined" />
                                <TextField fullWidth label="Estado" variant="outlined" />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* material ui checkbox to check if the person aprove the terms and conditions of cavok viagens, only if this checkbox is checked the consumer can finish the payment */}
            <FormControlLabel
                control={<Checkbox />}
                label={
                    <>
                        Li e concordo com os{" "}
                        <a href="/terms" className="text-[#134085] hover:underline">
                            termos e condições
                        </a>{" "}
                        da Cavok Viagens
                    </>
                }
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
