import Logout from '../Logout';

function Admin() {
    return (
        <div>
            <h2>Admin page</h2>
            <Logout />
            <a href="/dashboard">dashboard</a>
        </div>
    );
}

export default Admin;
