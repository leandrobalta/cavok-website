export function formatDate(date: string) {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString("pt-BR");
}

export function getTime(date: string) {
    const dateObj = new Date(date);
    //get only hour and minute
    return dateObj.toLocaleTimeString("pt-BR").slice(0, 5);
}
