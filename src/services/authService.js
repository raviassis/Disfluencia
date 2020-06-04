
export default {

    login(email, password) {
        throw new Error('Not implemented yet!');
        const request =  this.$http
          .post("/users/login", {email, password});
        request.then(res => {
            sessionStorage.setItem("_id", res.data._id);
        });

        return request;
    }, 
    getUserLogged() {
        return JSON.parse(sessionStorage.getItem('user'));
    },
    isLogged() {
        return !!this.getUserLogged();
    },
    logout(){
        sessionStorage.removeItem('user');
    }
}