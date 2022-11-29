// RSA script

// inicializa promennych
let n, l, e, d;
// inicializa pro pole cisel
let hashtable = new Object();

// funkce pro validaci prvocisla
function validatePrime( prime, nameOfPrime ) {
    if ( !isPrime( prime ) ) {
        alert( "'" + nameOfPrime + "' Zadané číslo není prvočíslo. Zadejte prosím prvočíslo.");
        return false;
    }
    if ( prime <= 7 ) {
        alert( "'" + nameOfPrime + "' Zadané prvočíslo by mělo být větší než 7" );
        return false;
    }
    return true;
}


// funkce pro desifrovaci klic - vypocet D
function findDecryptionKeys( e, l ) {
    let ds = [];
    for ( let x = l; x < l + 100000; x++ ) {
        if ( x * e % l === 1 ) {
            ds.push( x );
            if ( ds.length > 5 )
            return ds;
        }
    }
    return ds;
}


// funkce pro vypocet a dosazeni promennych n, l, e, d
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
    document.getElementById( "enKeyListSpan" ).innerHTML = "Možné šifrovací klíče jsou: " + es;
    encryptorChanged();
}


// funkce pro vyber nejmensiho desifrovaciho klice a jeho vypis, findDecryptionKeys odkazuje na vypocetni funkci desifrovacich klicu   
function encryptorChanged() {
    e = document.getElementById( "e" ).value;

    let ds = findDecryptionKeys( e, l );
    ds.splice( ds.indexOf( e ), 1 );
    d = ds[ 0 ];
    document.getElementById( "d" ).value = d;
    document.getElementById( "deKeyListSpan" ).innerHTML = "Možné dešifrovací klíče jsou: " + ds;

    document.getElementById( "private-key" ).innerHTML = "E = " + e + " , N = " + n;
    document.getElementById( "public-key" ).innerHTML = "D = " + d + " , N = " + n;
}

// funkce pro vyber hodnoty z textoveho pole D a jeho vypis 
function decryptorChanged() {
    d = document.getElementById( "d" ).value;
    document.getElementById( "public-key" ).innerHTML = "(" + d + "," + n + ")";
}


// funkce zjistuje jestli je zadane cislo prvocislo
function isPrime( num ) {
    if ( isNaN( num ) || !isFinite( num ) || num % 1 || num < 2 ) return false;
    if ( num % 2 == 0 ) return ( num == 2 );
    let m = Math.sqrt( num );
    for ( let i = 3; i <= m; i += 2 ) {
        if ( num % i == 0 ) return false;
    }
    return num !== 1;
}


// funkce pro vypocet moznych sifrovacich klicu
function findEncryptionKeys( l, n ) {
    let arr = [];
    for ( let i = 2; i < l; i++ ) {
        if ( isCoPrime( i, l ) && isCoPrime( i, n ) )
            arr.push( i );
        if ( arr.length > 5 ) break;
    }
    return arr;
}


// funkce vyhodnocuje 2 cisla a jejich spolecny faktor 1, nesoudelnost prvocisel a jejich delitel je 1
function isCoPrime( a, b ) {
    let aFac = findFactors( a );
    let bFac = findFactors( b );
    // vsechny prvky v poli projdou testem
    let result = aFac.every( x => bFac.indexOf( x ) < 0 );
    return result;
}

function findFactors( num ) {
    if ( hashtable[ num ] )
        return hashtable[ num ];

    // zajisteni celeho cisla <= num.
    let half = Math.floor( num / 2 ), 
    result = [],
    i, j;
    console.log( "čislo:", half );

    // 1 by mel byt soucasti kazdeho reseni, ale pro nas ucel COPRIME 1 by mel byt vyloucen
    //result.push(1);
    

    // Urceni hodnoty prirustku pro smycku a pocatecni bod
    num % 2 === 0 ? ( i = 2, j = 1 ) : ( i = 3, j = 2 );

    for ( i; i <= half; i += j ) {
        num % i === 0 ? result.push( i ) : false;
    }

    // uvedeni puvodniho cisla
    result.push( num ); 

    hashtable[ num ] = result;
    return result;
}


// funkce pro zasifrovani zpravy
function encrypt() {
    let m = document.getElementById( "message" ).value;
    console.log( m );
    let text = Array.from( Array( m.length ).keys() ).map( i => m.charCodeAt( i ) );
    console.log( text );
    let ascii = Array.from( Array( m.length ).keys() ).map( i => m.charCodeAt( i ) );
    document.getElementById( "ascii" ).innerHTML = ascii;

    let encrypted = ascii.map( i => powerMod( i, e, n ) );
    document.getElementById( "encrypted-msg" ).innerHTML = encrypted;
    document.getElementById( "encrypted-msg-textbox").value = encrypted;
}


// funkce pro rozsifrovani zpravy  
function decrypt() {
    let cipher = stringToNumberArray( document.getElementById( "encrypted-msg-textbox" ).value );
    
    console.log( cipher );

    let ascii = cipher.map( i => powerMod( i, d, n ) );
    document.getElementById( "ascii-decrypted" ).innerHTML = ascii;

    let message = "";
    ascii.map( x => message += String.fromCharCode( x ) );
    document.getElementById( "decrypted-msg").innerHTML = message;
}



// funkce pro parsovani integer

function stringToNumberArray( str ) {
    return str.split( "," ).map( i => parseInt( i ) );
}

/*
function encode_utf8( s ) {
    return unescape( encodeURIComponent( s ) );
}

function decode_utf8( s ) {
    return decodeURIComponent( escape( s ) );
}
*/


// modularni umocneni (a^p % n), udrzuje cisla v datovem rozsahu integer 
function powerMod( base, exponent, modulus ) {
    if ( modulus === 1 ) return 0;
    var result = 1;
    base = base % modulus;
    while ( exponent > 0 ) {
        if ( exponent % 2 === 1 )  // liche cislo
            result = ( result * base ) % modulus;
        exponent = exponent >> 1; // sude cislo
        base = ( base * base ) % modulus;
    }
    return result;
}     