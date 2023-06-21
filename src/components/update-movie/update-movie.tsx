import { Component, Host,State,h } from '@stencil/core';

@Component({
  tag: 'update-movie',
  styleUrl: 'update-movie.css',
  // shadow: true,
})
export class UpdateMovie {
  @State() movid:number;
  @State() movupname:string;
  @State() movupcity:string;
  @State() movupimg:string;
  @State() movupcast:string;
  @State() movupdir:string;
  @State() movupdes:string;


  @State() movname:HTMLInputElement;
  @State() movcity:HTMLInputElement;
  @State() movimg:HTMLInputElement;
  @State() movcast:HTMLInputElement;
  @State() movdir:HTMLInputElement;
  @State() movdes:HTMLInputElement;

  @State() error:HTMLElement;

  async updateMovie(event:Event){
    event.preventDefault();
    let movie = {
      movid:this.movid, 
      movname: this.movname.value,
      movcity: this.movcity.value,
      movcast: this.movcast.value,
      movdir: this.movdir.value,
      movdes: this.movdes.value
     
    };
    await fetch('http://localhost:9000/updatemovie', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movie),
    });
    this.error=<error-message message='Movie Updated Successfully' success={true}></error-message>
    setTimeout(() => {
      location.href="/movielist"
    }, 1000);
  }

  componentDidLoad(){
    const checkdata = JSON.parse(localStorage.getItem("editmovie"));
    this.movid =checkdata.movid;
    document.getElementById("spanid").append(String(this.movid));
    this.movupname=checkdata.movname;
    this.movupcity=checkdata.movcity;
    this.movupimg=checkdata.movimg;
    this.movupcast=checkdata.movcast;
    this.movupdir=checkdata.movdir;
    this.movupdes=checkdata.movdes;
  }


  render() {
    return (
      <Host>
        <div class="error">{this.error}</div>,
        <div class="thContainer">
 
       <form id="movForm" onSubmit={this.updateMovie.bind(this)}>
       <table>
        <h1>Update Movie</h1>
        <br></br>
        <tr>
            <td><label>Movie ID : </label></td>
            <td><span id="spanid" ></span></td>
        </tr>
        <tr>
         <td><label>Name : </label></td>
         <td><input type="text" placeholder="Enter Movie" name="movname" id="movname" value={this.movupname} required ref={el => (this.movname=el as HTMLInputElement)}></input></td>
         <td></td>
        </tr>
        <tr>
            <td><label>City : </label></td>
            <td><input type="text" placeholder="Enter City" name="movcity" id="movcity" value={this.movupcity} required ref={el => (this.movcity=el as HTMLInputElement)}></input></td>
           </tr>
        <tr>
                <td><label>Image : </label></td>
                 <td><input type="file" placeholder="Enter Theater Address" name="movimg" value={this.movupimg} id="movimg"ref={el => (this.movimg=el as HTMLInputElement)} ></input></td> 
               
        </tr>
      
        
        <tr>
            <td><label>Cast : </label>  </td>
            <td><input type="textarea"  name="movcast" id="movcast" value={this.movupcast} ref={el => (this.movcast=el as HTMLInputElement)}></input></td>
           
        </tr>
        <tr>
            <td><label>Director : </label> </td>
            <td><input type="text"  name="movdir" id="movdir" value={this.movupdir}ref= {el => (this.movdir=el as HTMLInputElement)}></input></td>
           
        </tr>
        <tr>
            <td><label>Description : </label>  </td>
            <td><input type="textarea"  name="movdes" id="movdes"value={this.movupdes}  ref={el => (this.movdes=el as HTMLInputElement)} ></input></td>
           
        </tr>
        <tr>
            
            <td><input type="submit" class="regbtn" value="Save"></input></td>
            <td><input type="reset" class="regbtn" value="Clear"></input></td>
            
        </tr>

        </table>
       </form>

    </div>
      </Host>
    );
  }

}
