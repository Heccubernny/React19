import { NetworkInfo } from '../components/NetworkInfo';
import { ParentComponent } from '../hooks/Callback';

function Home() {

    return (
        <>
            <ParentComponent />
            <NetworkInfo />
        </>
    );
}

export default Home;
