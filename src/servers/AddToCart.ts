"use server";

export async function addToCart( _previousState: object, queryData: { get: ( arg0: string ) => string; } ) {
    const itemID = queryData.get( "itemID" );

    if ( itemID === "1" ) {
        return {
            message: "Item added to cart.",
            itemID,
            success: true,
            cartSize: 12 + 1,
        };
    } else {
        // fake delay
        await new Promise( resolve => {
            setTimeout( resolve, 2000 );
        } );

        return {
            message: "Could't add to cart: the item is sold out.",
            itemID,
            success: false,
            cartSize: 12,
        };
    }
}