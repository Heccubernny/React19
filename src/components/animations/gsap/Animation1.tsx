import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from 'gsap';

const Animation1 = () => {
    const box = useRef( null );
    const container = useRef( null );


    useGSAP( (context) => {
        gsap.to( box.current, { x: 100, duration: 5 } );
        gsap.from( '.box', { x: 100, duration: 1 } );
        gsap.to( container.current, {
            x: 100, scale: 0, repeat: -1, ease: "power3.inOut", yoyo: true, stagger: {
                each: 0.2
            }, duration: 1
        } );

        console.log( gsap.version );

        console.log("context: ", context)

    }, { scope: container, dependencies: [ box ], revertOnUpdate: true } );
    return (
        <div>
            <h1>GSAP Animation</h1>
            <div ref={ container }>
                <h1 className="box">Animation 1</h1>
            </div>
            <div className="box" ref={ container }>
                <h1>Animation 2</h1>
            </div>
            <div className="box" ref={ box }>
                <h1>Animation 3</h1>
            </div>
            <div ref={ box }>
                <h1>Animation 4</h1>
            </div>
        </div>
    );
};
export default Animation1;