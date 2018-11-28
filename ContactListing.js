import React from 'react';
import { Button } from 'semantic-ui-react';
import ServerConnection from './services/ServerConnection.js';
import ElementsPhonebook from './ElementsPhonebook.js';
import Search from './services/Search.js';
import './ContactListing.css';

const Notification = ({message}) => {
    if (message === null) {
        return null
    }
    return (
        <div className="error">
            {message}
        </div>
    )
}

class ContactListingApp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            contacts: 0,
            persons: [],
            searchForm: "",
            matchingContacts: 0,
            matchingPersons: [],
            nameForm: "",
            numberForm: "",
            newKey: "",
            error: null
        }
        this.deletePerson = this.deletePerson.bind(this)
    }

    componentDidMount() {
        console.log('| ContactListingApp > mounted')
        ServerConnection.getAll().then(response => {
            console.log('| ServerConnection > GET')
            return (
                this.setState({persons: response })
            )
        })
    }

    setNameForm = (newValue) => {
        return (
            this.setState({nameForm: newValue, newKey: newValue})
        )
    }

    setNumberForm = (newValue) => {
        return (
            this.setState({numberForm: newValue})
        )
    }

    handleNumberFormChange = (event) => {
        console.log(event.target.value)
        this.setState({numberForm: event.target.value})
    }

    handleNameFormChange = (event) => {
        console.log(event.target.value)
        this.setState({nameForm: event.target.value, newKey: event.target.value})
    }

    handleSearchFormChange = (event) => {
        console.log(event.target.value)
        this.setState({searchForm: event.target.value})
    }

    searchMatchingContacts = (event) => {
        event.preventDefault()
        const searchablePerson = {name: this.state.searchForm, key: this.state.searchForm}

        return (
            this.setState({matchingPersons: Search({search:searchablePerson, contacts:this.state.persons})})
        )
    }

    personListContains = (person) => {
        var contains = false;
        for (let i = 0; i < this.state.persons.length; i++) {
            if (this.state.persons[i].key.toLowerCase() === person.key.toLowerCase()) {
                contains = true;
            }
        }
        return contains;
    }

    idOfPerson = (person) => {
        var id = -1;
        for (let i = 0; i < this.state.persons.length; i++) {
            if (this.state.persons[i].key.toLowerCase() === person.key.toLowerCase()) {
                id = this.state.persons[i].id;
            }
        }
        return id;
    }

    addPerson = (event) => {
        event.preventDefault()
        const newPerson = {
            name: this.state.nameForm,
            number: this.state.numberForm,
            id: this.state.persons[this.state.persons.length -1].id +1,
            key: this.state.nameForm}

        if (!this.personListContains(newPerson)) {
            return (
                ServerConnection.createItem(newPerson).then(response => {
                    console.log('| ServerConnection > POST');
                    this.setState({
                        persons: this.state.persons.concat(response),
                        nameForm: "",
                        numberForm: "",
                        newKey: "",
                        searchForm: "",
                        error: null
                    })
                })
            )
        } else {
            if (window.confirm('Korvataanko henkilön ' + newPerson.name + ' puhelinnumero(t)?')) {
                const idToAlter = this.idOfPerson(newPerson);
                newPerson.id = idToAlter;
                return (
                    ServerConnection.replaceItem(idToAlter, newPerson).then(response => {
                        console.log('| ServerConnection > PUT');
                        this.componentDidMount();
                        return (
                            this.setState({
                                persons: this.state.persons,
                                nameForm: "",
                                numberForm: "",
                                newKey: "",
                                searchForm: "",
                                error: 'Henkilön ' + newPerson.name + ' numero(t) on korvattu uudella'}),
                                setTimeout(() => {
                                    this.setState({error: null})
                                }, 5000)
                        )
                    })
                )
            } else {
                return (
                    this.setState({
                        persons: this.state.persons,
                        nameForm: "",
                        numberForm: "",
                        newKey: "",
                        searchForm: "",
                        error: 'Henkilö ' + newPerson.name + ' on jo listalla'}),
                        setTimeout(() => {
                            this.setState({error: null})
                        }, 5000)
                )
            }
        }
    }

    deletePerson = (person) => {
        if (window.confirm('Poistetaanko ' + person.name + '?')) {
            if (this.personListContains(person)) {
                return (
                    ServerConnection.deleteItem(person.id)
                    .then(response => {
                        console.log('| ServerConnection > DELETE');
                        this.componentDidMount();
                    })
                    .catch(error => {
                        console.log('| ServerConnection > DELETE - FAIL');
                        this.componentDidMount();
                        return (
                            this.setState({
                                nameForm: "",
                                numberForm: "",
                                newKey: "",
                                searchForm: "",
                                error: 'Henkilöä ' + person.name + ' ei voitu poistaa, on jo poistettu'}),
                            setTimeout(() => {
                                this.setState({error: null})
                            }, 5000)
                        )
                    })
                )
            }
        } else {
            return (
                this.setState({
                    nameForm: "",
                    numberForm: "",
                    newKey: "",
                    searchForm: "",
                    error: 'Henkilöä ' + person.name + ' ei poistettu'}),
                setTimeout(() => {
                    this.setState({error: null})
                }, 5000)
            )
        }
    }

    render() {
        return (
            <div>
                debug: {this.state.nameForm + ' ~ ' + this.state.numberForm + ' ~ ' + this.state.searchForm}
                <h2>Puhelinluettelo</h2>
                <Notification message={this.state.error} />
                <form onChange={this.searchMatchingContacts}>
                    <input
                        placeholder="rajaa näytettäviä"
                        value={this.state.searchForm}
                        onChange={this.handleSearchFormChange}
                    />
                </form>
                <h3>Lisää uusi / muuta olemassaolevaa numeroa</h3>
                <form onSubmit={this.addPerson}>
                    <input
                        placeholder="nimi"
                        value={this.state.nameForm}
                        onChange={this.handleNameFormChange}
                    /> {' '}
                    <input
                        placeholder="numero"
                        value={this.state.numberForm}
                        onChange={this.handleNumberFormChange}
                    /> {' '}
                    <Button basic compact size='medium' type='submit' color='green'>lisää</Button>
                </form>
                <h3>Numerot</h3>
                <ElementsPhonebook search={this.state.searchForm} contacts={this.state.persons} foundContacts={this.state.matchingPersons} deletePerson={this.deletePerson} />
            </div>
        )
    }
}

export default ContactListingApp