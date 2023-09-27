import { Button, TextField } from "@mui/material";
import { useState } from "react";

export default function Signin() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Aqui você pode adicionar lógica para autenticar o usuário
    };

    return (
        <div className="f-full flex items-center justify-center pt-20 px-4">
            <div className="w-96 p-4 space-y-4 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold">Inscrição</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <TextField
                        fullWidth
                        label="Nome completo"
                        variant="outlined"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Senha"
                        variant="outlined"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <div className="w-full flex flex-col gap-2">
                        <Button type="submit" variant="contained" color="primary">
                            Inscrever-se
                        </Button>
                        <p className="flex justify-center gap-2 whitespace-nowrap">
                            Ja possui cadastro?
                            <a href="/login" className="text-[#134074] hover:underline">
                                Entrar
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
