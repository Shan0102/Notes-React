const parseDate = (date: Date): string => {
    const year = date.getFullYear();

    let month = (date.getMonth() + 1).toString();
    if (month.length === 1) month = `0${month}`;

    let day = date.getDate().toString();
    if (day.length === 1) day = `0${day}`;

    let hours = date.getHours().toString();
    if (hours.length === 1) hours = `0${hours}`;

    let minutes = date.getMinutes().toString();
    if (minutes.length === 1) minutes = `0${minutes}`;

    return `${year}-${month}-${day} ${hours}:${minutes}`;
};

const parseTitle = (title: string): string => {
    if (title.length > 20) {
        const newTitle = title.slice(0, 18);
        return newTitle + "...";
    }
    return title;
};

export { parseDate, parseTitle };
