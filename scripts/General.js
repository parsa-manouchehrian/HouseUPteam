function createHeader() {
    let header = document.getElementById("header");
    header.class = "col-12";
    let content = `<div class="row">
    <div class="col-10">
        <p id="logo">H⌂useUp</p>
    </div>
    <div class="col-2">
      <i id="menu" class="fa fa-bars"></i>
    </div>`;

    header.innerHTML = content;
  }

  createHeader();