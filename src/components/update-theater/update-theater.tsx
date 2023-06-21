import { Component, Host, State, h } from '@stencil/core';

@Component({
  tag: 'update-theater',
  styleUrl: 'update-theater.css',
  // shadow: true,
})
export class UpdateTheater {

  @State() thid:number;
  @State() thupname:string;
  @State() thupcity:string;
  @State() thuptype:number;
  @State() thupsc:number
  @State() thupadd:string;
  @State() thupimg:string;

  @State() thname:HTMLInputElement;
  @State() thcity:HTMLInputElement;
  @State() thtype:HTMLInputElement;
  @State() thsc:HTMLInputElement;
  @State() thadd:HTMLInputElement;
  @State() thimg:HTMLInputElement;

  @State() error:HTMLElement;
  async updateTheater(event:Event){
    event.preventDefault();
   let theater = {
     thid:this.thid, 
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
   this.error=<error-message message='Theater Updated Successfully' success={true}></error-message>
   setTimeout(()=>location.href="/theaterlist",1000);

  }

  componentDidLoad(){
    const checkdata = JSON.parse(localStorage.getItem("edittheater"));
    this.thid =checkdata.thid;
    document.getElementById("spanid").append(String(this.thid));
    this.thupname=checkdata.thname;
    this.thupcity=checkdata.thcity;
    this.thuptype=checkdata.thtype;
    this.thupsc=checkdata.thsc;
    this.thupadd=checkdata.thadd;
    this.thupimg=checkdata.thimg;
  }


  render() {
    return (
      <Host>
       
       <div class="error">{this.error}</div>,
    <div class="thContainer">
       <form id="thForm" onSubmit={this.updateTheater.bind(this)}>
       <table>
        <h1>Update Theater</h1>
        <tr>
            <td><label>Theater ID : </label></td>
            <td><span id="spanid" ></span></td>
        </tr>
        <tr>
         <td><label>Name : </label></td>
         <td><input type="text" placeholder="Enter Theater" name="thname" id="thupname" value={this.thupname} required ref={el => (this.thname=el as HTMLInputElement)}></input></td>
         <td></td>
        </tr>
        <tr>
            <td><label>City : </label></td>
            <td><input type="" placeholder="Enter City" name="thcity" id="thupcity"value={this.thupcity} required ref={el => (this.thcity=el as HTMLInputElement)}></input></td>
           </tr>
        <tr>
            <td><label>No. of Screen : </label></td>
            <td><input type="number" id="thuptype" name="thtype" value={this.thuptype} required ref={el => (this.thtype=el as HTMLInputElement)}></input></td>

        </tr>
        <tr>
            <td><label>Seat Capacity : </label></td>
            <td><input type="number" name="thsc" id="thupsc"  value={this.thupsc} required ref={el => (this.thsc=el as HTMLInputElement)}></input></td>
           
        </tr>
        <tr>
            <td><label>Address : </label></td>
            <td><input type="textarea" placeholder="Enter Theater Address"value={this.thupadd}  name="thadd" id="thupadd"required ref={el => (this.thadd=el as HTMLInputElement)}></input></td>
           
        </tr><tr>
            <td><label>Image : </label></td>
            <td><input type="file" name="thimg" id="thupimg"  value={this.thupimg} ref={el => (this.thimg=el as HTMLInputElement)}></input></td>
           
        </tr>

        <tr>
            
            <td><input type="submit" class="regbtn" value="Update"></input></td>
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
