# numero-palabra
Módulo de Node.js para convertir números a palabra.
Esto puede ser útil para devolver cifras en palabras
donde sea necesario, por ejemplo, un contrato.

Soporta números enteros dentro del rango de 64 bits:

-9223372036854775808 y 9223372036854775807

Los número se ingresan en formato string, debido a que
javascript soporta de manera segura solo números entre:

-9007199254740991 y 9007199254740991

(MIN_SAFE_INTEGER) (MAX_SAFE_INTEGER)

Ejemplo:
```javascript
let NumeroPalabra = require('numero-palabra')

let snpalabra = NumeroPalabra('198765432')
console.log(snpalabra)
// ciento noventa y ocho millones setecientos sesenta y cinco mil cuatrocientos treinta y dos
```
