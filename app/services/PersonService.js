function PersonService() {
    this.getListPersonApi = function () {
        return axios({
            url: "https://60db0a2d801dcb0017290dc2.mockapi.io/QLTT",
            method: "GET",
        });
    };

    this.addPersonApi = function (person) {
        return axios({
            url: "https://60db0a2d801dcb0017290dc2.mockapi.io/QLTT",
            method: "POST",
            data: person,
        });
    };

    this.deletePersonApi = function (id) {
        return axios({
            url: `https://60db0a2d801dcb0017290dc2.mockapi.io/QLTT/${id}`,
            method: "DELETE",
        });
    };

    this.getPersonById = function (id) {
        return axios({
            url: `https://60db0a2d801dcb0017290dc2.mockapi.io/QLTT/${id}`,
            method: "GET",
        });
    };

    this.updatePersonApi = function (person) {
        console.log(person.id);
        return axios({
            url: `https://60db0a2d801dcb0017290dc2.mockapi.io/QLTT/${person.id}`,
            method: "PUT",
            data: person,
        });
    };
}