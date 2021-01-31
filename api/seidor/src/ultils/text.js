export function compareInputToValue(input, value) {
 return value
    .toString()
    .toLowerCase()
    .replace(/\W/g, "")
    .includes(input.toLowerCase().replace(/\W/g, ""));
}
