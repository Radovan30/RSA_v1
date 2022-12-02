
//metoda na generovani Primarnich cisel + check
function generatePrime( From, To ) {
    //To=256;

    let help = To / 2;
    To = Math.pow( 2, help );

    let RandomNumber = 0;
    let array = new Array();
    array[ To ] ;
   

    let count = 0;
    for ( let i = From; i < To; i++ ) {
        if ( ( i == 2 || i == 3 || i == 5 || i == 7 ) || ( i % 2 != 0 && i % 3 != 0 && i % 5 != 0 && i % 7 != 0 && Math.sqrt( i ) % 1 != 0 ) )
            if ( i != 0 ) {
                array[ count ] = i;
                count++;
            }
    }

    console.log( "tohle je c>" + count );

    

}

console.log( generatePrime( 0, 1024 ) )

