




export const numberFormat = (valor) => {
    return new Intl.NumberFormat('es-CL', { currency: 'CLP', style: 'currency' }).format(valor);
}
