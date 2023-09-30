import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LoginBackground from "assets/images/login-background.jpg";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Aqui você pode adicionar lógica para processar a inscrição do usuário
    };

    return (
        <>
            <img src={LoginBackground} className="fixed" alt="" />
            <div className="h-full flex items-center justify-center pt-20 px-4">
                <div className="w-96 p-4 space-y-4 bg-white shadow-md rounded-lg z-10">
                    <h2 className="text-2xl font-bold">Login</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <TextField
                            fullWidth
                            label="Email"
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <>
                            <TextField
                                fullWidth
                                label="Password"
                                variant="outlined"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <a href="" className="text-[#134074] hover:underline text-end">
                                Esqueceu sua senha?
                            </a>
                        </>

                        <div className="w-full flex flex-col gap-2 mt-4">
                            <Button type="submit" variant="contained" color="primary">
                                Entrar
                            </Button>
                            <p className="flex justify-center gap-2 whitespace-nowrap">
                                Ainda nao possui cadastro?
                                <a href="/signin" className="text-[#134074] hover:underline whitespace-nowrap">
                                    Crie uma conta
                                </a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
