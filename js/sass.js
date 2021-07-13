let service = new PersonService();
function getListPerson() {
    service
        .getListPersonApi()
        .then(function (result) {
            renderTable(result.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}

getListPerson();
function renderTable(list) {
    let contentHTML = "";
    list.forEach(function (item, index) {
        if(item.loaiND == "GV") {
            contentHTML += `
            <div class="col-lg-3 col-sm-6" data-aos="fade">
            <div class="card">
              <div class="T_imgContain">
                <img class="card-img-top" src="./images/${item.hinhAnh}" alt="">
              </div>
              <div class="card-body">
                <div class="card-title">
                  <p class="T_Nation">${item.ngonNgu}</p>
                  <p class="T_personName">${item.hoTen}</p>
                </div>
                <p class="card-text">${item.moTa}</p>
              </div>
            </div>
          </div>
            `;
        }
    });
    document.getElementById("T_content_Box").innerHTML = contentHTML;
}