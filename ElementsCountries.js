import React from 'react';

const ElementForRendering = ({search, countries, foundCountries}) => {
    if (search.length > 0) {
        if (foundCountries.length > 0) {
            if (foundCountries.length > 10) {
                return (
                    <div>
                        <p>too many matches, specify more accurately</p>
                    </div>
                )
            } else {
                if (foundCountries > 1) {
                    return (
                        <div>
                            <ul>
                                <Countries maat={foundCountries} />
                            </ul>
                        </div>
                    )
                } else {
                    return (
                        <div>
                            <ul>
                                <Countries maat={foundCountries} />
                            </ul>
                        </div>
                    )
                }
            }
        }
        if (foundCountries <= 0) {
            return (
                <div>
                    <p>no results</p>
                </div>
            )
        }
    } else {
        return (
            <div>
                <ul>
                    <Countries maat={countries} />
                </ul>
            </div>
        )
    }
}

const Countries = ({maat}) => {

    return (
        <ul>
            { maat.map(maako =>
                <li key={maako.name}> {<Country maita={maat.length} maa={maako} />} </li>)}
        </ul>
    )
}

const Country = ({maita, maa}) => {
    if (maita > 1) {
        return (
            <div>
                <Maa nimi={maa.name} maa={maa} />
            </div>
        )
    } else {
        return (
            <div>
                <YksiMaa
                    nimi={maa.name}
                    paakaupunki={maa.capital}
                    vaesto={maa.population}
                    lippu={maa.flag} />
            </div>
        )
    }
}

const Maa = ({nimi, maa}) => {
    return (
        <div>
            <p>{nimi}</p>
        </div>
    )
}

const YksiMaa = ({nimi, paakaupunki, vaesto, lippu}) => {
    return (
        <div>
            <h3>{nimi}</h3>
            <p>capital: {paakaupunki}</p>
            <p>population: {vaesto}</p>
            <img src={lippu} />
        </div>
    )
}

class ElementsCountries extends React.Component {
    render() {
        return (
            <ElementForRendering
                search={this.props.search}
                countries={this.props.countries}
                foundCountries={this.props.foundCountries}
            />
        )
    }
}

export default ElementsCountries