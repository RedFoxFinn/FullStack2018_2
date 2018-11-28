import React from 'react';
import ReactDOM from 'react-dom';
import Kurssi from './Kurssi.js'
import './index.css';

const Kurssit = ({kurssit}) => {

    return (
        <div>
            {kurssit.map(kurssiko => <li key={kurssiko.id}>{<Kurssi kurssi={kurssiko} />}</li> )}
        </div>
    )
}

const App = () => {

    const kurssit = [
        {
            nimi: 'Half Stack -sovelluskehitys',
            id: 1,
            osat: [
                {
                    nimi: 'Reactin perusteet',
                    tehtäviä: 10,
                    id: 1
                },
                {
                    nimi: 'Tiedonvälitys propseilla',
                    tehtäviä: 7,
                    id: 2
                },
                {
                    nimi: 'Komponenttien tila',
                    tehtäviä: 14,
                    id: 3
                },
                {
                    nimi: 'Redux',
                    tehtäviä: 7,
                    id: 4
                }
            ]
        },
        {
            nimi: 'Node.js',
            id: 2,
            osat: [
                {
                    nimi: 'Routing',
                    tehtäviä: 3,
                    id: 1
                },
                {
                    nimi: 'Middlewaret',
                    tehtäviä: 7,
                    id: 2
                }
            ]
        }
    ]

    return (
        <div>
            <Kurssit kurssit={kurssit} />
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)