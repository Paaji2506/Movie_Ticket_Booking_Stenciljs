import { Component, Host, State, h } from '@stencil/core';

@Component({
  tag: 'addth-movie',
  styleUrl: 'addth-movie.css',
  // shadow: true,
})
export class AddthMovie {
  @State() thea:any;
  @State() movid:any;
  
  @State() error:HTMLElement;

 componentWillLoad(){
   this.thea = JSON.parse(localStorage.getItem("addthmovie"));
   this.loadMovies();
   }
   
   async loadMovies(){
    let res = await fetch("http://localhost:9000/getmovie");
    if(res.status===200){
    let movdata = await res.json();
    for (let check of movdata) {
      const theamov = document.getElementById("theamov");
      const tcnode1 = document.createElement("option");
      tcnode1.value = check.movid;
      tcnode1.append(check.movname);
      theamov.append(tcnode1);
   }
  }



   let resp = await fetch("http://localhost:9000/getthmovie/"+this.thea.thid);
  
   if(resp.status==200)
  {
    let movdata = await resp.json();
   for (let check of movdata) {
    const thmovtable = document.getElementById("thmovtable");
    const thmovtr = document.createElement("tr");
    const thmovtd = document.createElement("td");
    thmovtd.append(check.movid);
    const thmovtd1 = document.createElement("td");
    thmovtd1.append(check.movname);
    const thmovtd2 = document.createElement("td");
    thmovtd2.append(check.movcity);
    const thmovtd3 = document.createElement("td");
    thmovtd3.append(check.movimg);
    const thmovtd5 = document.createElement("td");
    thmovtd5.append(check.movthea);
    const thmovtd6 = document.createElement("td");
    thmovtd6.append(check.movcast);
    const thmovtd7 = document.createElement("td");
    thmovtd7.append(check.movdir);
    const thmovtd8 = document.createElement("td");
    thmovtd8.append(check.movdes);
    // const thmovtd9 = document.createElement("td");
    // const delthlink = document.createElement("a");
    // delthlink.append(document.createTextNode("Delete"));

    // delthlink.addEventListener("click", ()=>{
    //   this.delThMovie(check);
    //    });

    // thmovtd9.append(delthlink);
    thmovtr.append(thmovtd);
    thmovtr.append(thmovtd1);
    thmovtr.append(thmovtd2);
    thmovtr.append(thmovtd5);
    thmovtr.append(thmovtd6);
    thmovtr.append(thmovtd7);
    thmovtr.append(thmovtd8);
    // thmovtr.append(thmovtd9);
    thmovtable.append(thmovtr);

   

   }
}

  }

  

  async addMovie(){
   await fetch("http://localhost:9000/addthmovie/"+this.thea.thid+"/"+this.movid.value,{
  method: 'POST',
    headers: {
      "Accept": "application/json",
      "Content-type": "application/json"
    },
});

this.error=<error-message message='Movie added to Theater ' success={true}></error-message>
setTimeout(() => location.href = ("/addthmovie"), 1000);

  }

  async delThMovie(movie){
    alert(movie.movid);
  let resp = await fetch("http://localhost:9000/deletethmovie/"+movie.movid,{
    method : "DELETE"
}
);
let msg = await resp.text();
alert(msg);
this.error=<error-message message="${msg}"></error-message>
location.reload();
  }

  render() {
    return (
      <Host>
   <div class="error">{this.error}</div>
   <h1>Add Movies to&nbsp;<span class="regbtn" >{this.thea.thname} , {this.thea.thcity}</span></h1>
   <br></br>
   <div>
      <select id="theamov" ref={el => (this.movid = el as HTMLSelectElement)}>
           <option value="none" selected disabled hidden>Select Movies to Add</option>
      </select>
      
      <button class="regbtn" onClick={this.addMovie.bind(this)}>ADD</button>
   </div>
   
   <table id="thmovtable" cellspacing="25px" cellpadding="20px">

       <tr>
           <th>Movid</th>
           <th>Name</th>
           <th>City</th>
           <th>Image</th>
           <th>Cast</th>
           <th>Director</th>
           <th>Description</th>
           {/* <th>Delete</th> */}
       </tr>
       

   </table>
  
  <br></br><br></br>

      </Host>
    );
  }

}
