import { Component, Host, State, h } from '@stencil/core';

@Component({
  tag: 'movie-list',
  styleUrl: 'movie-list.css',
  // shadow: true,
})
export class MovieList {
  @State() movies: any;
  @State() loading=true;
  @State() content:any;

  async getMovies() {
    let resp = await fetch('http://localhost:9000/getmovie');
    if (resp.status == 200) {
      let movdata = await resp.json();
    
      const thtable = document.getElementById('movtable');
      for (let check of movdata) {
  
        const thtr = document.createElement("tr");
        const thtd = document.createElement("td");
        thtd.append(check.movid);
        const thtd1 = document.createElement("td");
        thtd1.append(check.movname);
        const thtd2 = document.createElement("td");
        thtd2.append(check.movcity);
        const thtd3 = document.createElement("td");
        thtd3.append(check.movimg);
        const thtd4 = document.createElement("td");
        thtd4.append(check.movcast);
        const thtd5 = document.createElement("td");
        thtd5.append(check.movdir);
        const thtd6 = document.createElement("td");
        thtd6.append(check.movdes);
        const thtd8 = document.createElement("td");
        const editlink = document.createElement("a");
        const dellink = document.createElement("a");
        editlink.append(document.createTextNode("Edit "));
        dellink.append(document.createTextNode("Delete"));

        thtd8.append(editlink);
        thtd8.append(dellink);
        thtr.append(thtd);
        thtr.append(thtd1);
        thtr.append(thtd2);
        thtr.append(thtd3);
        thtr.append(thtd4);
        thtr.append(thtd5);
        thtr.append(thtd6);
        thtr.append(thtd8);
        thtable.append(thtr);

        editlink.addEventListener("click", function () {
          localStorage.setItem("editmovie",JSON.stringify(check));
          location.href = "/updatemovie";

        });

        dellink.addEventListener("click", ()=> {
          this.delMovie(check);
        });
       
        this.loading=false;
      }
    }
  }

  componentDidLoad() {
    this.getMovies();
  }

  
  async delMovie(thea){
    let text="Are you sure you want to Delete?";
   if(confirm(text)){
       let resp = await fetch("http://localhost:9000/deletemovie/"+thea.movid,{
      method : "DELETE"
}
);
let msg = await resp.text();
alert(msg);
location.reload();
}
 }
 

  render() {
    if(this.loading){
      this.content=<uc-spinner></uc-spinner>
    }
    else{
      this.content='';
    }
    return (
      <Host>
          <div class="tableview">
          <br></br>
          {this.content}
          <table id="movtable" cellspacing="25px" cellpadding="20px">
            <tr>
              <th>Movid</th>
              <th>Name</th>
              <th>City</th>
              <th>Image</th>
              <th>Cast</th>
              <th>Director</th>
              <th>Description</th>
              <th>Edit / Delete</th>
            </tr>
          </table>
        </div>
        <br></br><br></br>
      </Host>
    );
  }

}
