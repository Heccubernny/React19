import { useState } from 'react';
import DropZoneArea from 'react-dropzone';
const Dropzone = () => {
    const [ files, setFiles ] = useState<File[]>( [] );

    const handleFileUpload = ( newFiles: File[] ) => {
        setFiles( [ ...files, ...newFiles ] );
    };

    console.log( files.map( ( file ) => file.name ) );

    return (
        <div>
            <DropZoneArea onDrop={ handleFileUpload } accept={ {
                'image/jpeg': [], 'image/png': [], "application/pdf": [ ".pdf", ".epub" ],
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                    [ ".docx" ],
                "application/msword": [ ".doc" ],
                "text/plain": [ ".txt" ],
                "application/vnd.ms-excel": [ ".xls" ],
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                    [ ".xlsx" ],
                "application/vnd.ms-powerpoint": [ ".ppt" ],
                "application/vnd.openxmlformats-officedocument.presentationml.presentation":
                    [ ".pptx" ],
                "application/zip": [ ".zip" ],
                "application/x-rar-compressed": [ ".rar" ],
                'application/x-tar': [ ".tar" ],
                'application/x-7z-compressed': [ ".7z" ],
                'application/x-bzip': [ ".bz" ],
                'application/x-bzip2': [ ".bz2" ],
                'application/x-gzip': [ ".gz" ],
                'video/mp4': [ ".mp4" ],
            } } maxFiles={ 5 } maxSize={ 1000000 } minSize={ 1200 } multiple>
                { ( { getRootProps, getInputProps } ) => (
                    <section>
                        <div { ...getRootProps() }>
                            <input { ...getInputProps() } />
                            <p>Drag 'n' drop some files here, or click to select files</p>
                        </div>
                        <aside>
                            <h4>Files</h4>
                            <ul>
                                { files.map( ( file, index ) => (
                                    <li key={ index }>
                                        <span>{ file.name }</span> -
                                        <span>{ ( file.size / 1024 / 1024 ).toFixed( 2 ) }MB</span>
                                    </li>
                                ) ) }
                            </ul>
                        </aside>
                    </section>
                ) }
            </DropZoneArea>
        </div>
    );
};
export default Dropzone;