import { useActionState } from "react";
import { addToCart } from "../servers/AddToCart";
import { z } from "zod";

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
async function increment( previousState: number, _formData: any ) {
    return previousState + 1;
}

const Cart = z.object( {
    message: z.string(),
    itemID: z.string(),
    success: z.boolean(),
    cartSize: z.number(),
} );

Cart.safeParse( {
    message: "Item added to cart.",
    itemID: "1",
    success: true,
    cartSize: 1,
} );


function AddToCartForm( { itemID, itemTitle }: { itemID: string, itemTitle: string; } ) {

    const [ formState, formAction ] = useActionState( addToCart, {

        message: "",

        itemID: "",

        success: false,

        cartSize: 0

    } );


    return (
        <form action={ formAction }>
            <h2>{ itemTitle }</h2>
            <input type="hidden" name="itemID" value={ itemID } />
            <input type="hidden" name="itemTitle" value={ itemTitle } />
            { formState.success && (
                <div className="toast">
                    Added to cart! Your cart now has { formState.cartSize } items.
                </div>
            ) }
            { formState.success == false && (
                ( <div className="error">
                    Failed to add to cart: { formState.message }
                </div> )
            ) }
            <button type="submit">Add to Cart</button>
        </form>
    );
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars, 
function IncrementButton() {
    const [ state, formAction, isPending ] = useActionState( increment, 0 );

    return (
        // <button onClick={incrementCount} disabled={isPending}>
        //     {isPending ? "Loading..." : count}
        // </button>
        <form>
            { state }
            <button formAction={ formAction }>{ isPending ? "Increasing" : "Increment" }</button>
        </form>
    );
}

// eslint-disable-next-line no-empty-pattern
export function ActionState( { } ) {
    return (
        <>
            <AddToCartForm itemID="1" itemTitle="Welcome Bro" />
            <AddToCartForm itemID="2" itemTitle="Welcome Sis" />
            <IncrementButton />
        </>

    );
}