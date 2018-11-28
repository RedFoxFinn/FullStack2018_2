import React from 'react';
import axios from 'axios';
import ElementsCountries from './ElementsCountries.js'

class Maat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            maat: [],
            maita: 0,
            matchingCountries: [],
            matches: 0,
            newSearch: ''
        }
    }

    componentDidMount() {
        console.log('did mount')
        axios.get('https://restcountries.eu/rest/v2/all').then(response => {
            return (
                this.setState({maat: response.data, maita: response.data.length})
            )
        })
    }

    searchMatchingCountries = (event) => {
        event.preventDefault()
        const searchableCountry = {
            name: event.target.value
        }
        this.setState({newSearch: event.target.value})

        var matchingCountries = []
        const countries = this.state.maat

        for (var i = 0; i < countries.length; i++) {
            const countryOnTheList = countries[i].name.toLowerCase()
            const countryToCompare = searchableCountry.name.toLowerCase()

            if (countryOnTheList.includes(countryToCompare)) {
                matchingCountries = matchingCountries.concat(countries[i])
            }
        }

        if (this.state.newSearch.length > 0) {
            if (matchingCountries.length > 0) {
                this.setState({
                    matchingCountries: matchingCountries,
                    matches: matchingCountries.length
                })
            } else {
                this.setState({
                    matchingCountries: [],
                    matches: 0
                })
            }
        }
    }

    render() {
        return (
            <div>
                debug: {' ~ ' + this.state.newSearch + ' ~ '}
                <form onChange={this.searchMatchingCountries} >
                    <input
                        placeholder="find countries"
                        ref={input => this.Maat = input}
                        onChange={this.searchMatchingCountries}
                    />
                </form>
                <ElementsCountries search={this.state.newSearch} countries={this.state.maat} foundCountries={this.state.matchingCountries} />
            </div>
        )
    }
}

export default Maat