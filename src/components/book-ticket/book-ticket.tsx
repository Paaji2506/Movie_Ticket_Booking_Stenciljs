import { Component, Host, h,Prop, State } from '@stencil/core';

@Component({
  tag: 'book-ticket',
  styleUrl: 'book-ticket.css',
  // shadow: true,
})
export class BookTicket {

  @Prop() movname:string;
  @State() theater:string;
  @State() date:string;
  @State() timing:string;
  @State() uid:string;

  @State() seatbooked:boolean=false;
  @State() seatcount:number=0;
  @State() seatprice:number=0;
  @State() seatrow:string;

seatCount(btn,seatno){
	if(!this.seatbooked){
		this.seatcount = this.seatcount+1;
		this.seatprice=this.seatcount*110;
		this.seatbooked=true;
		btn.style.backgroundColor="green";
		this.seatrow=seatno;
	}
	else{
		// this.seatcount = this.seatcount-1;
		// this.seatprice=this.seatcount/110;
		this.seatbooked=false;
		btn.style.backgroundColor="gray";
	}
}

async seatBooking(event:Event){	
   event.preventDefault();
    let tcid = Math.floor(Math.random() * 10000);
    let booking={
       tcid : tcid,
	   uid: this.uid,
	    tcthname:this.theater,
       tcdate : this.date,
       tcshow:this.timing,
       tcquan:this.seatcount,
       tcprice : this.seatprice,
      }
      let resp = await fetch('http://localhost:9000/addbooking', {
        method: 'POST',
        body: JSON.stringify(booking),
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json"
        },
      });
      if(resp.status==200) alert("Booking Done successfully...");
       setTimeout(() => location.href = ("/ticketpage"), 1000);

}


  componentDidLoad(){
this.uid=localStorage.getItem("loguserid");
 this.loadtheater();
  const seatcol1 = document.getElementById("seatcol1");
   let ch='A';
for(let i=1;i<=10;i++){
	for(let j=20;j>=1;j--){
     let btn =  document.createElement("button");
	 let span =  document.createElement("span");
	 let label =  document.createElement("label");
	 let pspace =  document.createElement("p");
    btn.style.color="white";
	 btn.append(String(j));
	 span.innerHTML="&nbsp;&nbsp;";
	 label.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
	 seatcol1.append(span);
     btn.type="button";
	 btn.addEventListener('click',()=>{
		this.seatCount(btn,String(ch)+String(j));
	 });

	 let ran=Number(Math.floor(Math.random() * 1000));
	 if(ran%9==0){
		btn.disabled=true;
		btn.style.backgroundColor="red";
	 }
	 
	seatcol1.append(btn);
	if(j==11){
		seatcol1.append(label);

	}
	if(j==1){
		seatcol1.append(pspace);
  }
 
  }
   ch = String.fromCharCode(ch.charCodeAt(0) + 1);
}
  }

   async loadtheater(){
      const theat = document.getElementById("theat");
    let resp = await fetch('http://localhost:9000/gettheater');
    if (resp.status == 200) {
      let thdata = await resp.json();
      for(let check of thdata){
      const option = document.createElement("option");
	  let name =check.thname+","+check.thcity;
       option.append(name);
       option.value=name;
      theat.append(option);
      }
  }
  }

  handleTheater(event){
   this.theater=event.target.value;
  }
  handleDate(event){
	this.date=event.target.value;
   }

  handleTiming(event){
	this.timing=event.target.value;
   }

  render() {
    return (
      <Host>
<form onSubmit={this.seatBooking.bind(this)}> 
         <div class="movdate">
			
	<table cellspacing="10px" cellpadding="15px">
	<tr>
	<td><label>Theater : </label></td>
		<td><select id="theat" onInput={(e)=>this.handleTheater(e)}  >
				<option value="none" selected disabled hidden>Select Theater</option>
		   </select></td>
		</tr>
	<tr>
   <td><label>Date :</label></td>
	<td><input type="date" id="movdt" name="tcdate" onInput={(e)=>this.handleDate(e)}></input></td>
	</tr>
   <br></br>
   <tr>
   <td><label>Show Timing : </label></td>
	<td><select id="movshow" name="tcshow" onInput={(e)=>this.handleTiming(e)}>
		<option value="none" selected disabled hidden>Select Show Timing</option>
		<option value="09:15 AM">09:15 AM</option>
		<option value="12:15 PM">12:15 PM</option>
		<option value="03:15 PM">03:15 PM</option>
		<option value="06:15 PM">06:15 PM</option>
		<option value="09:15 PM">09:15 PM</option>
	</select></td>
	</tr>
	</table>
	</div>


  
<div class="content">
	<h2>Seat Booking</h2>
	<div class="main">
		<div class="demo">
			<div id="seat-map">
				<div class="front">SCREEN</div>					
			</div>
			<br></br>
			<div id="seats">
				<div class="seat-col1" id="seatcol1">

				</div>
				<div class="seat-col2" id="seatcol2">

				</div>
				
			</div>
			
			<div class="booking-details">
				<ul class="book-left">
					<li>Movie </li>
					<li>Tickets</li>
					<li>Total</li>
					<li>Selected Seats</li>
				</ul>
				<ul class="book-right">
					<li>: Commando 3</li>
					<li>: <span id="counter">{this.seatcount}</span></li>
					<li>: <b><i>RS.</i><span id="total">{this.seatprice}</span></b></li>
					<li>: {this.seatrow}</li>
				</ul>
				
			</div>
			

			
		</div>
		

   </div>

   <input type='submit' id="nextbtn" class="nxtbtn" value="Next"></input>
   

     
	
    </div>
 
  </form> 
      </Host>
    );
  }

}
