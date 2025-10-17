export default function FormatDate({rawDate}: {rawDate: string}) {
    const date = new Date(rawDate);
    const options: Intl.DateTimeFormatOptions = { month: "long", day: "numeric" };
    const dateString = date.toLocaleDateString("en-US", options);

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12 || 12;

    return `${dateString} at ${hours}:${minutes}${ampm}`;

}