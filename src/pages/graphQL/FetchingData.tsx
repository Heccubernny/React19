import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router";

// const FILMS_QUERY = gql`
//     query GetFilms {
//         films {
//         title
//         episodeID
//         }
//     },

//     query GetFilm($id: ID!) {
//         film(id: $id) {
//         title
//         episodeID
//         }
//     }

//     mutation CreateFilm($title: String!, $episodeID: Int!) {
//         createFilm(title: $title, episodeID: $episodeID) {
//         title
//         episodeID
//         }
//     },

//     mutation UpdateFilm($id: ID!, $title: String!, $episodeID: Int!) {
//         updateFilm(id: $id, title: $title, episodeID: $episodeID) {
//         title
//         episodeID
//         }
//     },

//     mutation DeleteFilm($id: ID!) {
//         deleteFilm(id: $id) {
//         title
//         episodeID
//         }

//     },
// `;

const FILMS_QUERY = gql`
    query GetFilms($limit: Int!) {
        launchesPast(limit: $limit) {
            id
            mission_name
            links {
                video_link
            }
            upcoming
        }
    }

    
`;

// const INSERT_USERS = gql`
// mutation Insert_users($objects: [users_insert_input!]!) {
//   insert_users(objects: $objects) {
//     affected_rows
//     returning {
//       id
//       name
//       rocket
//       timestamp
//       twitter
//     }
//   }
// }
// `;
const FetchingData = () => {
    const limit = 23;
    const { data, loading, error } = useQuery( FILMS_QUERY, {
        variables: {
            limit
        },
        fetchPolicy: "cache-and-network",
        pollInterval: 5000
    } );

    console.log( data );
    console.log( loading );
    console.log( error );
    // const [ addUser, { data: addUserResult, loading: addUserLoading, error: addUserError } ] = useMutation( INSERT_USERS, {
    //     variables: [
    //         {
    //             "id": 2,
    //             "name": "Elon Musk",
    //             "rocket": "Falcon 9",
    //             "timestamp": "2021-09-01T00:00:00.000Z",
    //             "twitter": "@elonmusk"
    //         }
    //     ]
    // } );
    return (
        <div>
            <h1>Fetching Data</h1>
            <p>Fetching data from a GraphQL server is easy with Apollo Client. You can use the useQuery hook to fetch data from your server and display it in your component.</p>
            <ul>
                { loading && <p>Loading...</p> }
                { error && <p>Error: { error.message }</p> }
                { data && data.launchesPast.map( ( film: { mission_name: string; id: number; } ) => (
                    <li key={ film.id }>
                        <Link to={ `${ film.links.video_link }` }>{ film.mission_name }</Link>
                    </li>
                ) ) }
            </ul>
        </div>
    );
};
export default FetchingData;;;