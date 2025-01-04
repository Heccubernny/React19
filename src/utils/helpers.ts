const getAcceptType = ( acceptedType: string ): { [ key: string ]: string[]; } => {
    switch ( acceptedType ) {
        case 'image':
            return { 'image/*': [ ".jpg", ".png" ] };
        case 'video':
            return { 'video/*': [ ".mp4", ".webm" ] };
        case 'pdf':
            return { 'application/pdf': [ ".pdf" ] };
        case 'files':
        default:
            return { '*/*': [] };
    }
};


const setMaxSize = ( acceptedType: string ): number => {
    switch ( acceptedType ) {
        case 'image':
            return 1048576 * 5; // 5MB
        case 'video':
            return 1048576 * 50; // 50MB
        case 'pdf':
            return 1048576 * 20; // 20MB
        case 'files':
        default:
            return 1048576 * 10; // 10MB
    }
};

const formatFileSize = ( size: number ): string | undefined => {
    if ( size >= 1073741824 ) {
        return ( size / 1073741824 ).toFixed( 2 ) + ' GB'; // 1GB
    } else if ( size >= 1048576 ) {
        return ( size / 1048576 ).toFixed( 2 ) + ' MB'; // 1MB
    } else if ( size >= 1024 ) {
        return ( size / 1024 ).toFixed( 2 ) + ' KB'; // 1KB
    } else if ( size < 1024 ) {
        return size + ' bytes';
    } else {
        return;
    }
};


const setMinSize: ( acceptedType: string ) => number = ( acceptedType: string ): number => {

    switch ( acceptedType ) {
        case 'image':
        case 'video':
        case 'pdf':
        case 'files':
        default:
            return 1000;
    }
};


export { getAcceptType, setMaxSize, formatFileSize, setMinSize };