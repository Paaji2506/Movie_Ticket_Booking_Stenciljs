import { Component, Host, State, h } from '@stencil/core';

@Component({
  tag: 'add-theater',
  styleUrl: 'add-theater.css',
  shadow: true,
})
export class AddTheater {

  @State() thname:HTMLInputElement;
  @State() thcity:HTMLInputElement;
  @State() thtype:HTMLInputElement;
  @State() thsc:HTMLInputElement;
  @State() thadd:HTMLInputElement;
  @State() thimg:HTMLInputElement;

  @State() error:HTMLElement;

  async saveTheater(event:Event){
    event.preventDefault();
     let thid=Number(Math.floor(Math.random() * 100));
    let theater = {
      thid:thid, 
      thname: this.thname.value,
      thcity: this.thcity.value,
      thtype:Number( this.thtype.value),
      thsc:Number( this.thsc.value),
      thadd: this.thadd.value
     
    };
    await fetch('http://localhost:9000/addtheater', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(theater),
    });
    this.error=<error-message message='Theater Added Successfully' success={true}></error-message>
    setTimeout(()=>location.href="/theaterlist",1000);

  }
  render() {
    return (
    <Host>
    <div class="error">{this.error}</div>,
    <div class="thContainer">
       <form id="thForm" onSubmit={this.saveTheater.bind(this)}>
       <table>
        <h1>Add Theater</h1>
        <tr>
         <td><label>Name : </label></td>
         <td><input type="text" placeholder="Enter Theater" name="thname" id="thname" required ref={el => (this.thname=el as HTMLInputElement)}></input></td>
         <td></td>
        </tr>
        <tr>
            <td><label>City : </label></td>
            <td><input type="" placeholder="Enter City" name="thcity" id="thcity" required ref={el => (this.thcity=el as HTMLInputElement)}></input></td>
           </tr>
        <tr>
            <td><label>No. of Screen : </label></td>
            <td><input type="number" id="thtype" name="thtype" required ref={el => (this.thtype=el as HTMLInputElement)}></input></td>

        </tr>
        <tr>
            <td><label>Seat Capacity : </label></td>
            <td><input type="number" name="thsc" id="thsc" required ref={el => (this.thsc=el as HTMLInputElement)}></input></td>
           
        </tr>
        <tr>
            <td><label>Address : </label></td>
            <td><input type="textarea" placeholder="Enter Theater Address" name="thadd" id="thadd"required ref={el => (this.thadd=el as HTMLInputElement)}></input></td>
           
        </tr><tr>
            <td><label>Image : </label></td>
            <td><input type="file" name="thimg" id="thimg" ref={el => (this.thimg=el as HTMLInputElement)}></input></td>
           
        </tr>

        <tr>
            
            <td><input type="submit" class="regbtn" value="Save"></input></td>
            <td><input type="reset" class="regbtn" value="Clear"></input></td>
            
        </tr>

        </table>
       </form>
       <br></br>
   
    </div>

      
      </Host>
    );
  }

}
