import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import FileInput from './FileInput';

export type ProductProps = {
    name: string;
    price: number;
    description: string;
    image: File;
    root?: string;

};

const AddProducts = () => {

    const { register, handleSubmit, setError, watch, getValues, control, formState: { errors, isSubmitting, isLoading } } = useForm<ProductProps>( {
        defaultValues: {
            name: "John Work",
            price: 0,
            description: "Helping you to work",
            image: {} as File,
        }
    } );
    const [ file, setFile ] = useState<File>( {} as File );

    const [ preview, setPreview ] = useState<string | undefined>( undefined );


    const handleFileUpload = ( acceptedFiles: File[] ) => {
        if ( acceptedFiles.length > 0 ) {
            const file = acceptedFiles[ 0 ];
            setFile( file );
            setPreview( URL.createObjectURL( file ) );
        }
    };


    const onSubmit: SubmitHandler<ProductProps> = async ( data: ProductProps ) => {
        try {
            const response = await fetch( 'https://fakestoreapi.com/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify( data ),
            } );

            console.log( response );
        } catch ( e ) {
            setError( "root", { message: ( e instanceof Error ? e.message : "An unknown error occurred" ) } );

        }
        console.log( data );
    };
    return (
        <div>
            <h2>{ isSubmitting ? "Submitting" : "Add" } New Product { isSubmitting && (
                <>
                    { !isLoading && ( <div>
                        { watch( "name" ) }
                        { getValues( "name" ) }
                    </div> ) }</>
            ) }</h2>
            <form onSubmit={ handleSubmit( onSubmit ) }>
                <label htmlFor="name">Name</label>
                <input id="name" type="text" placeholder="Name" { ...register( "name", { required: "Name is required" } ) } autoComplete='off' />
                <h3 className="fill-red-500">{ errors.name?.message }</h3>
                <label htmlFor="price">Price</label>

                <input id="price" type="number" placeholder="Price" { ...register( "price", { required: "Price is required" } ) } />
                <h3 className="fill-red-500">{ errors.price?.message }</h3>
                <label htmlFor="description">Description</label>

                <input id="description" type="text" placeholder="Description" { ...register( "description", { required: "Description is required" } ) } />

                <h3 className="fill-red-500">{ errors.description?.message }</h3>
                <label htmlFor="image">Image</label>


                <FileInput<ProductProps> control={ control } name={ "image" } file={ file } handleFileUpload={ handleFileUpload } preview={ preview } acceptedType="image" multiple={ true } />
                <h3 className="fill-red-500">{ errors.image?.message }</h3>
                <br />

                <button type="submit" disabled={ isSubmitting }>Add Product</button>

            </form>

            <h3 className="fill-red-500">{ errors.root?.message }</h3>

        </div>
    );
};
export default AddProducts;