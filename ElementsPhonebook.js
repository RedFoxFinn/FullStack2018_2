import React from 'react';
import { Table, Button } from 'semantic-ui-react';
import './ElementsPhonebook.css';
import 'semantic-ui-css/semantic.min.css';

const ElementForRendering = ({search, contacts, foundContacts, deletePerson}) => {
    if (search.length > 0) {
        if (foundContacts.length > 0) {
            return (
                <div>
                    <Contacts kontaktit={foundContacts} deletePerson={deletePerson} />
                </div>
            )
        } else {
            return (
                <div>
                    <p className="hakuvirhe">ei hakutuloksia</p>
                </div>
            )
        }
    } else {
        return (
            <div>
                <ul>
                    <Contacts className="listaus" kontaktit={contacts} deletePerson={deletePerson} />
                </ul>
            </div>
        )
    }
}

const Contacts = ({kontaktit, deletePerson}) => {
    return (
        <Table basic='very'>
            <Table.Body>
                {kontaktit.map(function(kontakti) {
                    return (
                        <Table.Row key={kontakti.key}>
                            <Table.Cell collapsing> <Nimi nimi={kontakti.name} /> </Table.Cell>
                            <Table.Cell collapsing> <Numero numero={kontakti.number} /> </Table.Cell>
                            <Table.Cell> <Button basic compact size='medium' color='red' content='poista' onClick={() => deletePerson(kontakti)} /> </Table.Cell>
                        </Table.Row>
                    )
                })}
            </Table.Body>
        </Table>
    )
}

const Nimi = ({nimi}) => {
    return (
        <p className="">{nimi}</p>
    )
}

const Numero = ({numero}) => {
    return (
        <p className="">{numero}</p>
    )
}

const ElementsPhonebook = ({search, contacts, foundContacts, deletePerson}) => {
    return (
        <ElementForRendering
            search={search}
            contacts={contacts}
            foundContacts={foundContacts}
            deletePerson={deletePerson}
        />
    )
}

export default ElementsPhonebook