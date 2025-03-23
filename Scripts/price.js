export default function price(num) {
    return `&#8377; ${new Intl.NumberFormat("en-IN").format(num)}`;
}
