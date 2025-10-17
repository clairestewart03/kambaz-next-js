export function formatDateString(rawDate?: string): string {
    if (!rawDate) return "";
    
    const date = new Date(rawDate);
    const options: Intl.DateTimeFormatOptions = { month: "long", day: "numeric" };
    const dateString = date.toLocaleDateString("en-US", options);

    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12 || 12;

    return `${dateString}, ${year}, ${hours}:${minutes}${ampm}`;
  }
  