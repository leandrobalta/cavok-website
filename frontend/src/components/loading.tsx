import { CircularProgress } from "@mui/material";

type LoadingPageProps = {
    show: boolean
}

export function LoadingPage(props: LoadingPageProps){

    if(props.show){
        return (
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0,0,0, 0.4)",
                zIndex: 9999,
            }}>
                <CircularProgress />
            </div>
        )
    }

    return null;
}