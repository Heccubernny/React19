import { useGSAP } from "@gsap/react";
import { useRef } from "react";

const Design1 = () => {
    const container = useRef( null );

    const { contextSafe } = useGSAP( { scope: container } );

    const onClickGood = contextSafe( () => {
        gsap.to( '.good', { rotation: 180 } );
    } );

    return (
        <div ref={ container }>
            <button onClick={ onClickGood } className="good">Click mee</button>
        </div>
    );
};
export default Design1;