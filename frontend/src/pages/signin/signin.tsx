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
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-96 p-4 space-y-4 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold">Inscrição</h2>
                <form onSubmit={handleSubmit}>
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
                    <Button type="submit" variant="contained" color="primary">
                        Inscrever-se
                    </Button>
                </form>
            </div>
        </div>
    );
}
