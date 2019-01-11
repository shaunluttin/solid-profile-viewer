//
// See https://solid.inrupt.com/docs/app-on-your-lunch-break
//

const popupUri = 'popup.html';
$('#btnLogin').click(() => solid.auth.popupLogin({ popupUri }));
$('#btnLogout').click(() => solid.auth.logout());

solid.auth.trackSession(session => {
    const loggedIn = !!session;
    $('#login').toggle(!loggedIn);
    $('#logout').toggle(loggedIn);
    $('#user').text(session && session.webId);
});

solid.auth.trackSession(session => {
    if (session) {
        $('#user').text(session.webId);
        if (!$('#profile').val())
            $('#profile').val(session.webId);
    }
});

// Get the logged in user's webID from the UI
// e.g. https://shaunluttin.inrupt.net/profile/card#me
const getUsersWebID = () => $('#profile').val();

const FOAF = $rdf.Namespace('http://xmlns.com/foaf/0.1/');
$('#btnView').click(async function loadProfile() {
    // Set up a local data store and associated data fetcher
    const store = $rdf.graph();
    const fetcher = new $rdf.Fetcher(store);

    const webID = getUsersWebID();
    dump(webID);

    await fetcher.load(webID);

    // Display their details
    const fullName = store.any($rdf.sym(webID), FOAF('name'));
    $('#fullName').text(fullName && fullName.value);
});
