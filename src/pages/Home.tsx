import { useTranslation } from 'react-i18next';
import { NetworkInfo } from '../components/NetworkInfo';
import { ParentComponent } from '../hooks/Callback';

function Home() {

    const { t } = useTranslation(); 

    return (
        
        <>
        {/* <Trans> */}

            <div>{ t( 'common.greeting') }</div>
            
            <div>{ t( 'Welcome to React' ) }</div>
            <div>{ t( 'notifications', {
                count: 0
            } ) }</div>

            <ParentComponent />
            <NetworkInfo />
            {/* </Trans> */ }
            </>
    );
}

export default Home;
