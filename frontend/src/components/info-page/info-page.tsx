import React from "react";

interface InfoPageProps{
    title: string;
    children: React.ReactNode;
}

export function InfoPage(props: InfoPageProps){
    return (
        <div className="flex flex-col w-full max-w-[80rem] gap-4">
            <h1 className="text-2xl font-bold">{props.title}</h1>
            <div className="text-start flex flex-col gap-2" >
                {props.children}
            </div>
        </div>
    )
}