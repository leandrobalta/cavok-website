import styled from "@emotion/styled";
import {
    Button,
    Divider,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
} from "@mui/material";
import { DatePicker, MobileDatePicker } from "@mui/x-date-pickers";
import { PayerTypeEnum } from "enums/payer-type";
import useWindowDimensions from "hooks/window-dimensions";
import { useState } from "react";
import InputMask from "react-input-mask";

const CavokToggleButton = styled(ToggleButton)({
    "&.Mui-selected, &.Mui-selected:hover": {
        color: "white",
        backgroundColor: "#134074",
    },
});

export default function Signin() {
    const { width } = useWindowDimensions();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState<PayerTypeEnum>(PayerTypeEnum.person);
    const [userGender, setUserGender] = useState<"male" | "female">("male");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Aqui você pode adicionar lógica para autenticar o usuário
    };

    const handleUserTypeChange = (event: React.MouseEvent<HTMLElement>, newUserType: PayerTypeEnum) => {
        setUserType(newUserType);
    };

    const onUserGenderChange = (event: SelectChangeEvent<string>) => {
        setUserGender(event.target.value as any);
    };

    return (
        <div className="f-full flex items-center justify-center pt-20 px-4">
            <div className="w-[40rem] p-4 space-y-4 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold">Inscrição</h2>
                <ToggleButtonGroup
                    value={userType}
                    exclusive
                    onChange={handleUserTypeChange}
                    color="primary"
                    className="bg-white"
                    fullWidth
                >
                    <CavokToggleButton value={PayerTypeEnum.person}>{"Pessoa Física"}</CavokToggleButton>
                    <CavokToggleButton value={PayerTypeEnum.company}>{"Pessoa Jurídica"}</CavokToggleButton>
                </ToggleButtonGroup>
                <Divider />
                <div className="grid grid-cols-2 gap-4">
                    {userType === PayerTypeEnum.person ? (
                        <>
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
                                    onChange={onUserGenderChange}
                                >
                                    <MenuItem value="male">Masculino</MenuItem>
                                    <MenuItem value="female">Feminino</MenuItem>
                                </Select>
                            </FormControl>
                            <InputMask mask="99.999-99">
                                <TextField fullWidth label="CEP" variant="outlined" />
                            </InputMask>
                            <TextField fullWidth label="Endereço" variant="outlined" />
                            <TextField fullWidth label="Número" variant="outlined" />
                            <TextField fullWidth label="Complemento" variant="outlined" />
                            <TextField fullWidth label="Bairro" variant="outlined" />
                            <TextField fullWidth label="Cidade" variant="outlined" />
                            <TextField fullWidth label="Estado" variant="outlined" />
                        </>
                    ) : (
                        <>
                            <TextField fullWidth label="Nome completo do responsável" variant="outlined" />
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
                                    label="Genero"
                                    onChange={onUserGenderChange}
                                >
                                    <MenuItem value="male">Masculino</MenuItem>
                                    <MenuItem value="female">Feminino</MenuItem>
                                </Select>
                            </FormControl>
                            <InputMask mask="999.999.999-99" maskChar={null}>
                                <TextField fullWidth label="CPF do responsável" variant="outlined" />
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
                            <InputMask mask="99.999-99">
                                <TextField fullWidth label="CEP" variant="outlined" />
                            </InputMask>
                            <TextField fullWidth label="Endereço" variant="outlined" />
                            <TextField fullWidth label="Número" variant="outlined" />
                            <TextField fullWidth label="Complemento" variant="outlined" />
                            <TextField fullWidth label="Bairro" variant="outlined" />
                            <TextField fullWidth label="Cidade" variant="outlined" />
                            <TextField fullWidth label="Estado" variant="outlined" />
                        </>
                    )}
                </div>
                <div className="w-full flex flex-col gap-2">
                    <Button onClick={handleSubmit} variant="contained" color="primary">
                        Inscrever-se
                    </Button>
                    <p className="flex justify-center gap-2 whitespace-nowrap">
                        {"Já possui cadastro?"}
                        <a href="/login" className="text-[#134074] hover:underline">
                            Entrar
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
