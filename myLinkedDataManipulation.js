//
// See https://solid.inrupt.com/docs/manipulating-ld-with-rdflib
//

const useTheStore = (store, webID) => {

    // TODO describe why the sym method does.
    const me = store.sym(webID);
    dump(me);

    const profile = me.doc();
    dump(profile);

    // TODO describe a VCARD it plain English
    const VCARD = new $rdf.Namespace('http://www.w3.org/2006/vcard/ns#');

    // Adds a triple (subject, predicate, object) to the store.
    // See https://github.com/linkeddata/rdflib.js/blob/2421d66b4d3d579feaa74f43fd33c1bfc347321c/src/store.js#L246
    const result = store.add(
        // subject
        me,
        // predicate: in this case, first name
        VCARD('fn'),
        // object
        'Shaun Luttin',
        // why: the document that will store the triple; in this case, my profile
        profile
    );

    dump(result);

    // Read data from the store.
    const name = store.any(me, VCARD('fn'), null, profile);
    dump(name);
};


$('#btnManipulateData').click(() => {

    const webID = getUsersWebID();
    dump(webID);

    // set up a store
    // this is a LOCAL representation of the graph
    const store = $rdf.graph();
    useTheStore(store, webID);

    // set up a fetcher
    // this lets us sync our store with the remote POD
    const fetcher = new $rdf.fetcher(store);
});
