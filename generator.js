

let p, q;
let bite = 16;
let squareBit = Math.ceil( Math.sqrt( bite ) );
console.log( "bite = " + bite )
console.log( "Odmocneno = " + squareBit )

function generate( bit ) {
    let genP;
    let temP = '0b';
    for ( let i = 0; i < bit; i++ ) {
        temP += Math.round( Math.random() );
        genP = parseInt( BigInt( temP ) );
    }
    while ( genP <= 7 ) {
        for ( let i = 0; i < bit; i++ ) {
            temP += Math.round( Math.random() );
            genP = parseInt( BigInt( temP ) );
        }
    } 
    return genP;
}

// funkce zjistuje jestli je zadane cislo prvocislo
function isPrime( num ) {
    if ( isNaN( num ) || !isFinite( num ) || num % 1 || num < 2 ) return false;
    if ( num % 2 == 0 ) return ( num == 2 );
    let m = Math.sqrt( num );
    for ( let i = 3; i <= m; i += 2 ) {
        if ( num % i == 0 )
            return false;
    }
    console.log( "is prime", num );
    return num !== 1;
}

console.log( generate( squareBit ) );
//console.log( isPrime( 6187634 ) );

//let n = parseInt( generate( squareBit ) )
//console.log( "N: ", n );
/*
function isPrime( num ) {
    if ( isNaN( num ) || !isFinite( num ) || num % 1 || num < 2 ) return false;
    if ( num % 2 == 0 ) return ( num == 2 );
    let m = Math.sqrt( num );
    for ( let i = 3; i <= m; i += 2 ) {
        if ( num % i == 0 )
            return false;
    }
    return num !== 1;
}
*/


/*
function random( num ) {
    let gen = generate( num );

    while ( !isPrime( gen ))
    {
        gen = generate( num );
    }
    console.log( "prime", gen );
    return num;
    }
    
console.log( random( squareBit ));

*/
/*
for ( let i = 0; i < squareBit; i++ ) {
    temP += Math.round( Math.random() );
}


let temQ = '0b';
for ( let i = 0; i < squareBit; i++ ) {
    temQ += Math.round( Math.random() );
}
q = BigInt( temQ );
qParseInt = parseInt( q );
console.log( "Q = ", qParseInt );

let result;
*/

/*
function generateP(  ) {
    let a;
    let temP = '0b';
    for ( let i = 0; i < squareBit; i++ ) {
        temP += Math.round( Math.random() );
        a = BigInt( temP );
    } 
    return a;
   
}

*/







/*
if ( isPrime == false ) {
 generateP();
} else
 
 

 p = BigInt( temP );
pParseInt = parseInt( p );
console.log( "P = ", pParseInt );







function generateP() {
 let a;
 let temP = '0b';
 for ( let i = 0; i < squareBit; i++ ) {
     temP += Math.round( Math.random() );
     a = BigInt( temP );
 }
 return a;

}

*/




/*
function test_prime( n ) {


    for ( let x = 2; x < n; x++ ) {
        if ( n % x === 0 ) {
            return false;
        }
    }
    return true;
}

console.log( test_prime( 3 ) );
*/