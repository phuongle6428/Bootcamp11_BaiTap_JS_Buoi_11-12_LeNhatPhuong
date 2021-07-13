function Person(_id, _taiKhoan, _matKhau, _hinhAnh, _moTa, _hoTen, _email, _ngonNgu, _loaiND) {
    this.id = _id;
    this.taiKhoan = _taiKhoan;
    this.matKhau = _matKhau;
    this.hinhAnh = _hinhAnh;
    this.moTa = _moTa;
    this.hoTen = _hoTen;
    this.email =_email;
    this.ngonNgu =_ngonNgu;
    this.loaiND = _loaiND;
    // this.loaiND = ((para) => {
    //     if (para == "GV") {
    //         return "Giáo Viên"
    //     } else if (para == "HV") {
    //         return "Học Viên"
    //     }
    // })(_loaiND);
}
