let service = new PersonService();
let personlist = [];
function getEle(id) {
    return document.getElementById(id);
};
function getListPerson() {
    service
        .getListPersonApi()
        .then(function (result) {
            renderTable(result.data);
            personlist = result.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

getListPerson();
function renderTable(list) {
    let contentHTML = "";
    list.forEach(function (item, index) {
        contentHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${item.taiKhoan}</td>
                <td>${item.matKhau}</td>
                <td>${item.hoTen}</td>
                <td>${item.email}</td>
                <td>${item.ngonNgu}</td>
                <td>${item.loaiND}</td>
                <td>
                    <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="editPerson(${
                        item.id
                    })">Sửa</button>
                    <button class="btn btn-danger" onclick="deletePerson(${
                        item.id
                    })">Xóa</button>
                </td>
            </tr>
        `;
    });
    getEle("tblDanhSachNguoiDung").innerHTML = contentHTML;
}

getEle("btnThemNguoiDung").addEventListener("click", function () {
    //Reset thong bao
    let inputarr = document.querySelectorAll("#myModal .form-control");
    let checkAnount = document.getElementsByClassName("checkAnount");
    let patternAnount = document.getElementsByClassName("patternAnount");
    Array.prototype.forEach.call(inputarr,function (value,index) {
            checkAnount[index].innerHTML = "";
            value.value = "";
            value.disabled = false;
            patternAnount[index].style.display = "none";
    });
    //Tạo tiêu đề cho modal-header
    document.getElementsByClassName("modal-title")[0].innerHTML = "Thêm ND";
    //Tạo nút button "Thêm" cho modal-footer
    let footer =
        '<button class="btn btn-success" onclick="addNguoiDung()">Thêm</button>';
    document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
});

/**
 * Thêm nguoi dung
 */
function addNguoiDung() {
    //Lấy value từ người dùng nhập qua các thẻ input
    let taiKhoan = getEle("TaiKhoan").value;
    let matKhau = getEle("MatKhau").value;
    let hinhAnh = getEle("HinhAnh").value;
    let moTa = getEle("MoTa").value;
    let hoTen = getEle("HoTen").value;
    let email = getEle("Email").value;
    let ngonNgu = getEle("loaiNgonNgu").value;
    let loaiND = getEle("loaiNguoiDung").value;
    //Tạo đối tượng person từ lớp đối tượng Product
    let person = new Person("", taiKhoan, matKhau, hinhAnh, moTa, hoTen, email, ngonNgu, loaiND);
    if(formCheckValidate(true)) {
        return
    };
    service
    .addPersonApi(person)
    .then(function () {
        getListPerson();

        //Tắt modal
        document.getElementsByClassName("close")[0].click();
    })
    .catch(function (error) {
        console.log(error);
    });
}

/**
 * Xóa ND
 */
function deletePerson(id) {
    service
        .deletePersonApi(id)
        .then(function () {
            getListPerson();
            alert("Delete Success!");
        })
        .catch(function (error) {
            console.log(error);
        });
}

/**
 * Sửa ND
 */
function editPerson(id) {
    document.getElementsByClassName("modal-title")[0].innerHTML = "Sửa Người Dùng";

    let footer = `<button class="btn btn-success" onclick="updatePerson(${id})">Cập nhật</button>`;
    document.getElementsByClassName("modal-footer")[0].innerHTML = footer;

    //Reset thong bao
    let inputarr = document.querySelectorAll("#myModal .form-control");
    let checkAnount = document.getElementsByClassName("checkAnount");
    let patternAnount = document.getElementsByClassName("patternAnount");
    Array.prototype.forEach.call(inputarr,function (value,index) {
            checkAnount[index].innerHTML = "";
            value.value = "";
            value.disabled = false;
            patternAnount[index].style.display = "none";
    });

    service
        .getPersonById(id)
        .then(function (result) {
            getEle("TaiKhoan").value = result.data.taiKhoan;
            getEle("TaiKhoan").disabled = true;
            getEle("MatKhau").value = result.data.matKhau;
            getEle("HinhAnh").value = result.data.hinhAnh;
            getEle("MoTa").value = result.data.moTa;
            getEle("HoTen").value = result.data.hoTen;
            getEle("Email").value = result.data.email;
            getEle("loaiNgonNgu").value = result.data.ngonNgu;
            getEle("loaiNguoiDung").value = result.data.loaiND;
        })
        .catch(function (error) {
            console.log(error);
        });
}

/**
 * Cập nhật ND
 */
function updatePerson(id) {
    //Lấy value từ người dùng nhập qua các thẻ input
    let taiKhoan = getEle("TaiKhoan").value;
    let matKhau = getEle("MatKhau").value;
    let hinhAnh = getEle("HinhAnh").value;
    let moTa = getEle("MoTa").value;
    let hoTen = getEle("HoTen").value;
    let email = getEle("Email").value;
    let ngonNgu = getEle("loaiNgonNgu").value;
    let loaiND = getEle("loaiNguoiDung").value;
    //Tạo đối tượng person từ lớp đối tượng Product
    let person = new Person(id, taiKhoan, matKhau, hinhAnh, moTa, hoTen, email, ngonNgu, loaiND);
    if(formCheckValidate(false)) {
        return
    };
    service
        .updatePersonApi(person)
        .then(function () {
            getListPerson();
            alert("Update success!");
            //Tắt modal
            document.getElementsByClassName("close")[0].click();
        })
        .catch(function (error) {
            console.log(error);
        });
}
function formCheckValidate(isnotedit) {
    let count = 0;
    let inputarr = document.querySelectorAll("#myModal .form-control");
    let checkAnount = document.getElementsByClassName("checkAnount");
    let patternAnount = document.getElementsByClassName("patternAnount");
    Array.prototype.forEach.call(inputarr,function (value,index) {
        if(!value.validity.valid) {
            checkAnount[index].innerHTML = value.validationMessage;
            checkAnount[index].style.color = "red";
            count += 1;
            console.log(value.validity.patternMismatch);
            if(value.validity.patternMismatch) {
                patternAnount[index].style.display = "block";
                patternAnount[index].style.color = "green";
            }
        } else {
            checkAnount[index].innerHTML = "";
            patternAnount[index].style.display = "none";
        };
    });
    if(isnotedit) {
        let taiKhoan = getEle("TaiKhoan").value;
        for( let i = 0; i < personlist.length; i++) {
            if(taiKhoan == personlist[i].taiKhoan) {
                checkAnount[0].innerHTML = "Tên Tài Khoản đã được sử dụng";
                checkAnount[0].style.color = "red";
                count +=1;
            };
        };
    }
    if (count > 0) {
        return true;
    };
};