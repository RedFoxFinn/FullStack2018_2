import React from 'react';

const Kurssi = ({kurssi}) => {

    return (
        <div>
            <Otsikko otsikko={kurssi.nimi} />
            <Sisalto sisältö={kurssi.osat} />
        </div>
    )
}

const Otsikko = ({otsikko}) => {

    return (
        <div>
            <h1> {otsikko} </h1>
        </div>
    )
}

const Sisalto = ({sisältö}) => {

    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    return (
        <div>
            <ul>
                {sisältö.map(osa => <li key={osa.id}>{<Osa nimi={osa.nimi} tehtäviä={osa.tehtäviä} />}</li>)}
                {(<Yhteensa sisältö={sisältö} reducer={reducer} />)}
            </ul>
        </div>
    )
}

const Osa = ({nimi, tehtäviä}) => {

    return (
        <div>
            <p> {nimi} {tehtäviä} </p>
        </div>
    )
}

const Yhteensa = ({sisältö, reducer}) => {

    const tehtävät = sisältö.map(osa => osa.tehtäviä)
    const yhteensä = tehtävät.reduce(reducer)

    return (
        <div>
            <p> yhteensä {yhteensä} tehtävää </p>
        </div>
    )
}

export default Kurssi;