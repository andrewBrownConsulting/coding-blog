export function parseDate(dateString) {
    return new Date(Date.parse(dateString)).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}