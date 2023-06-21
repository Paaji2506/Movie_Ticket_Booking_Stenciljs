import { Component, Host, State, h } from '@stencil/core';


@Component({
  tag: 'theater-list',
  styleUrl: 'theater-list.css',
  // shadow: true,
})
export class TheaterList {
  @State() theaters: any;
  @State() loading=true;
  @State() content:any;


 

  async getTheaters() {
    let resp = await fetch('http://localhost:9000/gettheater');
    if (resp.status == 200) {
      let thdata = await resp.json();
    
      const thtable = document.getElementById('thtable');
      for (let check of thdata) {
  
        const thtr = document.createElement("tr");
        const thtd = document.createElement("td");
        thtd.append(check.thid);
        const thtd1 = document.createElement("td");
        thtd1.append(check.thname);
        const thtd2 = document.createElement("td");
        thtd2.append(check.thcity);
        const thtd3 = document.createElement("td");
        thtd3.append(check.thtype);
        const thtd4 = document.createElement("td");
        thtd4.append(check.thsc);
        const thtd5 = document.createElement("td");
        thtd5.append(check.thadd);
        const thtd6 = document.createElement("td");
        thtd6.append(check.thimg);
        const thtd7 = document.createElement("td");
        const movlink = document.createElement("a");
        thtd7.append(movlink);
        movlink.append(document.createTextNode("Add"));
        movlink.onclick=(()=>{
         localStorage.setItem("addthmovie",JSON.stringify(check));
         location.href="/addthmovie";

        });

        const thtd8 = document.createElement("td");
        const editlink = document.createElement("a");
        const dellink = document.createElement("a");
        editlink.append(document.createTextNode("Edit "));
        dellink.addEventListener("click", ()=> {
          this.deltheater(check);
       });
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
        thtr.append(thtd7);
        thtr.append(thtd8);
        thtable.append(thtr);

         

        editlink.addEventListener("click", function () {
        localStorage.setItem("edittheater",JSON.stringify(check));
          location.href = "/updatetheater";

        });

        
       
        this.loading=false;
      }
    }
  }
 

  componentDidLoad() {
    this.getTheaters();
  }

  async deltheater(thea){
    let text="Are you sure you want to Delete?";
   if(confirm(text)){
       let resp = await fetch("http://localhost:9000/deletetheater/"+thea.thid,{
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
          <table id="thtable">
            <tr>
              <th>Thid</th>
              <th>Name</th>
              <th>City</th>
              <th>No. of Screen</th>
              <th>Seat Capacity</th>
              <th>Address</th>
              <th>Image</th>
              <th>Add Movie</th>
              <th>Edit / Delete</th>
            </tr>
             
          </table>
        </div>
        <br></br><br></br> 
      </Host>
    );
  }
}
