import { State } from '@stencil/core';
import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'add-movie',
  styleUrl: 'add-movie.css',
  shadow: true,
})
export class AddMovie {

  @State() movname:HTMLInputElement;
  @State() movcity:HTMLInputElement;
  @State() movimg:HTMLInputElement;
  @State() movcast:HTMLInputElement;
  @State() movdir:HTMLInputElement;
  @State() movdes:HTMLInputElement;

  @State() error:HTMLElement;

  async saveMovie(event:Event){
    event.preventDefault();
     let movid=Number(Math.floor(Math.random() * 1000));

    let movie = {
      movid:movid, 
      movname: this.movname.value,
      movcity: this.movcity.value,
      movcast: this.movcast.value,
      movdir: this.movdir.value,
      movdes: this.movdes.value
     
    };
    await fetch('http://localhost:9000/addmovie', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movie),
    });
    this.error=<error-message message='Movie added Successfully' success={true}></error-message>
    setTimeout(() => {
      location.href="/movielist"
    }, 1000);
  }
  render() {
    return (
      <Host>
        <div class="error">{this.error}</div>,
        <div class="thContainer">
 
       <form id="movForm" onSubmit={this.saveMovie.bind(this)}>
       <table>
        <h1>Add Movie</h1>
        <br></br>
        <tr>
         <td><label>Name : </label></td>
         <td><input type="text" placeholder="Enter Movie" name="movname" id="movname" required ref={el => (this.movname=el as HTMLInputElement)}></input></td>
         <td></td>
        </tr>
        <tr>
            <td><label>City : </label></td>
            <td><input type="text" placeholder="Enter City" name="movcity" id="movcity" required ref={el => (this.movcity=el as HTMLInputElement)}></input></td>
           </tr>
        <tr>
                <td><label>Image : </label></td>
                {/* <td><input type="file" placeholder="Enter Theater Address" name="movimg" id="movimg"ref={el => (this.movimg=el as HTMLInputElement)} ></input></td> */}
               
        </tr>
      
        
        <tr>
            <td><label>Cast : </label>  </td>
            <td><input type="textarea"  name="movcast" id="movcast" ref={el => (this.movcast=el as HTMLInputElement)}></input></td>
           
        </tr>
        <tr>
            <td><label>Director : </label> </td>
            <td><input type="text"  name="movdir" id="movdir" ref={el => (this.movdir=el as HTMLInputElement)}></input></td>
           
        </tr>
        <tr>
            <td><label>Description : </label>  </td>
            <td><input type="textarea"  name="movdes" id="movdes" ref={el => (this.movdes=el as HTMLInputElement)} ></input></td>
           
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