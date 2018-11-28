
const Search = ({search, contacts}) => {
    return contacts.filter(contact => contact.key.toLowerCase().includes(search.key.toLowerCase()));
}
export default Search