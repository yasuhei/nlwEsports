
export function convertHourString(minutesAmount: number) {
    const hours = Math.floor(minutesAmount / 60)
    const minutus = minutesAmount % 60

    return  `${String(hours).padStart(2, '0')}:${String(minutus).padStart(2, '0')}`

}