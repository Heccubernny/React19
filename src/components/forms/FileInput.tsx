import Dropzone from "react-dropzone";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import swal from "sweetalert2";
import { getAcceptType, setMaxSize, setMinSize, formatFileSize } from "../../utils/helpers";

type FileInputProps<T extends FieldValues> = {
    control?: Control<T>;
    name: Path<T>;
    file?: File | File[];
    handleFileUpload?: ( acceptedFiles: File[] ) => void;
    acceptedType: "image" | "video" | "pdf" | "files";
    preview?: string | undefined;
    multiple?: boolean;

};
const FileInput = <T extends FieldValues>( { control, name, file, handleFileUpload, acceptedType, preview, ...props }: FileInputProps<T> ) => {

    const handleDrop = ( acceptedFiles: File[] ) => {
        const file = acceptedFiles[ 0 ];
        const minSize = setMinSize( acceptedType );
        const maxSize = setMaxSize( acceptedType );

        if ( file.size < minSize || file.size > maxSize ) {
            swal.fire( {
                title: "Error",
                text: `File size must be between ${ formatFileSize( minSize ) } and ${ formatFileSize( maxSize ) }.`,
                icon: "error",
            } );
            return;
        }

        if ( handleFileUpload ) {
            handleFileUpload( acceptedFiles );
        }
    };
    return (
        <Controller control={ control } name={ name } render={ ( { field } ) => <Dropzone onDrop={ ( acceptedFiles ) => { field.onChange( acceptedFiles ); handleDrop( acceptedFiles ); } } { ...field } accept={ getAcceptType( acceptedType ) } maxFiles={ 1 } maxSize={ setMaxSize( acceptedType ) } minSize={ setMinSize( acceptedType ) } { ...props }>
            { ( { getRootProps, getInputProps } ) => (
                <section>
                    { preview && (
                        <div>
                            { acceptedType === "image" && <img src={ preview } alt="Preview" style={ { maxWidth: "100%", height: "auto" } } /> }
                            { acceptedType === "video" && <video src={ preview } controls style={ { maxWidth: "100%", height: "auto" } } /> }
                            { acceptedType === "pdf" && <embed src={ preview } type="application/pdf" width="100%" height="500px" /> }
                        </div> ) }
                    <span { ...getRootProps() }>
                        <input type="image" { ...getInputProps() } onBlur={ field.onBlur } id={ acceptedType } />
                        <button type="button">Select File</button>
                    </span>
                    <aside>
                        <ul>
                            { file && (

                                <li style={ { listStyleType: "none" } }>

                                    { Array.isArray( file ) ? (

                                        file.length === 0 ? "No file selected" : file.map( ( f, index ) => (

                                            <div key={ index }>

                                                <span>{ f.name }</span>&nbsp;-&nbsp;

                                                <span>{ formatFileSize( f.size ) }</span>

                                            </div>

                                        ) )

                                    ) : file ? (

                                        <>

                                            <span>{ file.name }</span>

                                            { formatFileSize( file.size ) === undefined ? "" : ( <> - </> ) }

                                            <span>{ formatFileSize( file.size ) }</span>

                                        </>

                                    ) : "No file selected" }


                                </li>
                            ) }
                        </ul>
                    </aside>
                </section>
            ) }
        </Dropzone>
        } rules={ { required: "Image is required", validate: ( value ) => value && value.size > 1000000 ? "Image size should be less than 1MB" : true } } />

    );
};

export default FileInput;