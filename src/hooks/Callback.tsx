// use callback is a react hook that allows you to cache a function definition between re-renders. This is useful when you want to pass a function to a child component, but you don't want the function to be redefined on every render. This can help improve performance by preventing unnecessary re-renders. Here's an example of how you can use useCallback to cache a function definition:

import { useCallback } from 'react';


interface ChildComponentProps {
    onClick: () => void;
}

export function ChildComponent( { onClick }: ChildComponentProps ) {
    return <button onClick={ onClick }>Click me</button>;
}



export function ParentComponent() {
    const handleClick = useCallback( () => {
        console.log( 'Button clicked' );
    }, [] );
    // const handleClick = () => console.log( 'Button clicked' );

    return <ChildComponent onClick={ handleClick } />;
}

// In this example, the handleClick function is defined inside the ParentComponent. We use useCallback to cache the function definition, and then pass it to the ChildComponent as a prop. This ensures that the function is only defined once, even if the ParentComponent re-renders.


// function ProductPage( { productId, referrer }: { productId: string, referrer: string } ) {
//     const product = useData( '/product/' + productId );

//     const requirements = useMemo( () => { // Calls your function and caches its result
//         return computeRequirements( product );
//     }, [ product ] );

//     const handleSubmit = useCallback( ( orderDetails ) => { // Caches your function itself
//         post( '/product/' + productId + '/buy', {
//             referrer,
//             orderDetails,
//         } );
//     }, [ productId, referrer ] );

//     return (
//         <div className={ theme }>
//             <ShippingForm requirements={ requirements } onSubmit={ handleSubmit } />
//         </div>
//     );
// }