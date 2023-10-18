const GlobalFunction = {
    logout(){
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        localStorage.removeItem('phone');
        localStorage.removeItem('role_id');
        localStorage.removeItem('token');
        localStorage.removeItem('photo');

    }
}
export default GlobalFunction;