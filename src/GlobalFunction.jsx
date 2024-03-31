const GlobalFunction = {
    logout(){
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        localStorage.removeItem('phone');
        localStorage.removeItem('role_id');
        localStorage.removeItem('user_type');
        localStorage.removeItem('token');
        localStorage.removeItem('photo');
        window.location.href = window.location.origin
    },
    isAdmin(){
        if (localStorage.role_id != undefined && localStorage.role_id == 1){
            return true;
        }
        return false;
    }
}
export default GlobalFunction;