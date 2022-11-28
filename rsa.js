// RSA script

// inicializa promennych

let n, l, e, d;

// funkce pro validaci prvocisla
function validatePrime( prime, nameOfPrime ) {
    if ( !isPrime( prime ) ) {
        alert( "'" + nameOfPrime + "' Zadané číslo není prvočíslo. Zadejte prosím prvočíslo.");
        return false;
    }
    if ( prime <= 7 ) {
        alert( "'" + nameOfPrime + "' Zadané prvocislo by mělo být větší než 7" );
        return false;
    }
    return true;
}


// funkce pro kontrolu prvocisla
function isPrime( num ) {
    if ( isNaN( num ) || !isFinite( num ) || num % 1 || num < 2 ) return false;
    if ( num % 2 == 0 ) return ( num == 2 );
    let m = Math.sqrt( num );
    for ( let i = 3; i <= m; i += 2 ) {
        if ( num % i == 0 ) return false;
    }
    return num !== 1;
}


// funkce pro vypocet a dosazeni n, l, e, d
function calculate() {
    let p = document.getElementById( "p" ).value;
    let q = document.getElementById( "q" ).value;
    // validace p a q
    if ( !( validatePrime( p, "p" ) && validatePrime( q, "q" ) ) )
        return;
    // soucin 2 provisel 
    n = p * q;
    document.getElementById( "n" ).value = n;

    // delka - vypocet eulerovy funkce
    l = ( p - 1 ) * ( q - 1 );
    document.getElementById( "l" ).value = l;
    
    // vypocet pro mozne klice
    let es = findEncryptionKeys( l, n );
    document.getElementById( "e" ).value = es[ 0 ];
    document.getElementById( "enKeyListSpan" ).innerHTML = "Možne šifrovací klíče jsou: " + es;
    encryptorChanged();
}

function encryptorChanged() {
    e = document.getElementById( "e" );
    value;

    let decrypt = findEncryptionKeys( e, l );
    decrypt.splice( decrypt.indexOf( e ), 1 );
    d = decrypt[ 0 ];
    document.getElementById( "d" ).value = d;
    document.getElementById( "deKeyListSpan" ).innerHTML = "Možné dešifrovací klíče jsou:" + decrypt;

    document.getElementById( "private-key").innerHTML = "(" + e
}

// funkce pro vypocet moznych klicu
function findEncryptionKeys( l, n ) {
    let arr = [];
    for ( let i = 2; i < l; i++ ) {
        if ( isCoPrime( i, l ) && isCoPrime( i, n ) )
            arr.push( i );
        if ( arr.length > 5 ) break;
    }
    return arr;
}

// funkce pro 2 cisel k vyhodnoceni spolecneho faktoru 1, nesoudelnost prnovisel spolecny delitel je 1
function isCoPrime( a, b ) {
    let aFac = findFactors( a );
    let bFac = findFactors( b );
    // vsechny prvky v poli projdou testem
    let result = aFac.every( x => bFac.indexOf( x ) < 0 );
    return result;
}