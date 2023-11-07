export function dateToTimestamp(dateString: string): number | null {
    const dateParts = dateString.split("-");

    if (dateParts.length !== 3) {
        console.error('A data deve estar no formato "yyyy-mm-dd".');
        throw new Error('A data deve estar no formato "yyyy-mm-dd".');
    }

    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1; // Os meses no objeto Date são baseados em zero (janeiro é 0)
    const day = parseInt(dateParts[2], 10);

    const timestamp = new Date(year, month, day).getTime();
    return isNaN(timestamp) ? null : timestamp;
}
