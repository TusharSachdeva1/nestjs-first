async function fetchusers() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();
    return users;
}

export default fetchusers;