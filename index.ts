/*
    Clase que transforma en palabra un número.
    Esto puede ser útil para devolver cifras en palabras
    donde sea necesario, por ejemplo, un contrato.
    Soporta números entre el máximo rango de 64 bits:
    -9223372036854775808 y 9223372036854775807
    Los número se ingresan en formato string debido a que
    javascript soporta de manera segura solo números entre:
    -9007199254740991 y 9007199254740991
    (MIN_SAFE_INTEGER) (MAX_SAFE_INTEGER)
    Autor: Carlos Montiers A.
    Fecha: 2018-11-13
*/
class NumeroPalabra {
    protected static nommilessing: StringArray = {
        2: 'mil',
        3: 'un millón',
        4: 'un billón',
        5: 'un trillón',
        6: 'un cuatrillón',
        7: 'un quintillón'
    }
    protected static nommilessplu: StringArray = {
        2: 'mil',
        3: 'millones',
        4: 'billones',
        5: 'trillones',
        6: 'cuatrillones',
        7: 'quintillones'
    }
    protected static unidades: StringArray = {
        1: 'uno',
        2: 'dos',
        3: 'tres',
        4: 'cuatro',
        5: 'cinco',
        6: 'seis',
        7: 'siete',
        8: 'ocho',
        9: 'nueve'
    }
    protected static especiales: StringArray = {
        11: 'once',
        12: 'doce',
        13: 'trece',
        14: 'catorce',
        15: 'quince',
        16: 'dieciséis',
        17: 'diecisiete',
        18: 'dieciocho',
        19: 'diecinueve',
        20: 'veinte',
        21: 'veintiuno',
        22: 'veintidós',
        23: 'veintitrés',
        24: 'veinticuatro',
        25: 'veinticinco',
        26: 'veintiséis',
        27: 'veintisiete',
        28: 'veintiocho',
        29: 'veintinueve'
    }
    protected static decenas: StringArray = {
        1: 'diez',
        2: 'veinte',
        3: 'treinta',
        4: 'cuarenta',
        5: 'cincuenta',
        6: 'sesenta',
        7: 'setenta',
        8: 'ochenta',
        9: 'noventa'
    }
    protected static centenas: StringArray = {
        1: 'ciento',
        2: 'doscientos',
        3: 'trescientos',
        4: 'cuatrocientos',
        5: 'quinientos',
        6: 'seiscientos',
        7: 'setecientos',
        8: 'ochocientos',
        9: 'novecientos'
    }

    /**
     * Convierte a palabra el número
     * Por el momento, solo la parte entera
     */
    public static leer(numero: string): string {
        const NUMERIC_REGEXP = /^[-]?[\d]*[\.]?[\d]+$/g;
        numero = numero.trim()
        if (!NUMERIC_REGEXP.test(numero)) {
            throw "Número inválido"
        }
        let partes: string[]
        let parteEntera: string
        let spalabra: string = ''
        let saux: string
        let igrupo: IntegerArray = {}
        let inivel: number = 0
        let itotniveles: number = 0
        let ibase: number = 0
        let iacum: number = 0
        let iconta: number = 0
        let bincluir: boolean = true
        let idigito: number
        let ibegin: number
        let besnegativo: boolean = false

        partes = numero.split('.')
        parteEntera = partes[0]

        besnegativo = parteEntera.charAt(0) == '-'
        ibegin = besnegativo ? 1 : 0;
        for (let i = parteEntera.length - 1; i >= ibegin; i -= 1) {
            idigito = Number(parteEntera.charAt(i))
            ibase = Math.trunc(Math.pow(10, iconta))
            iacum += ibase * idigito
            iconta += 1
            if (iconta === 3) {
                itotniveles += 1
                igrupo[itotniveles] = iacum
                iacum = 0
                iconta = 0
                bincluir = false
            } else {
                bincluir = true
            }
        }
        if (bincluir) {
            itotniveles += 1
            igrupo[itotniveles] = iacum
        }
        inivel = itotniveles
        while (inivel > 0) {
            iacum = igrupo[inivel]
            saux = NumeroPalabra.milpalabra(iacum)
            if (inivel >= 2) {
                if (iacum === 1) {
                    saux = NumeroPalabra.nommilessing[inivel]
                } else {
                    saux += ' ' + NumeroPalabra.nommilessplu[inivel]
                }
            }
            if (iacum === 0) {
                if (itotniveles === 1) {
                    spalabra += ' ' + saux
                }
            } else {
                spalabra += ' ' + saux
            }
            inivel -= 1
        }

        spalabra = spalabra.trim()
        if (besnegativo) {
            spalabra = 'menos ' + spalabra
        }
        return spalabra
    }

    /**
     * Convierte a palabra un número entero entre 0 y 999
     * Función de uso interno
     * @param numero 
     */
    protected static milpalabra(numero: number): string {

        let spalabra: string
        let iaux: number
        let n: number

        iaux = Math.trunc(numero)
        if ((iaux < 0) || (iaux > 999)) {
            throw 'Número debe estar entre 0 y 999'
        }
        if (iaux === 0) {
            spalabra = 'cero'
            return spalabra
        }
        if (iaux === 100) {
            spalabra = 'cien'
            return spalabra
        }
        spalabra = ''
        if (iaux > 100) {
            n = Math.trunc(iaux / 100)
            spalabra += NumeroPalabra.centenas[n]
            iaux = iaux % 100
        }
        if (iaux === 10) {
            spalabra += ' ' + 'diez'
        }
        if (iaux > 10) {
            if (iaux <= 29) {
                n = iaux
                spalabra += ' ' + NumeroPalabra.especiales[n]
                spalabra = spalabra.trim()
                return spalabra
            } else {
                n = Math.trunc(iaux / 10)
                spalabra += ' ' + NumeroPalabra.decenas[n]
                iaux = iaux % 10
                if (iaux > 0) {
                    spalabra += ' y'
                }
            }
        }
        if ((iaux > 0) && (iaux < 10)) {
            n = iaux
            spalabra += ' ' + NumeroPalabra.unidades[n]
        }
        spalabra = spalabra.trim()
        return spalabra

    }

}

/* Indexable Types */

interface StringArray {
    [index: number]: string;
}

interface IntegerArray {
    [index: number]: number;
}

export = NumeroPalabra.leer;
