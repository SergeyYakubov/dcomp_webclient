export function make_auth(user, password, token) {
    if (token) {
        return token;
    }
    var tok = user + ':' + password;
    var hash = btoa(tok);
    return 'Basic ' + hash;
}
