import { Component, Event, EventEmitter, Host, State, h } from '@stencil/core';

@Component({
  tag: 'movie-popup',
  styleUrl: 'movie-popup.css',
  shadow: true,
})
export class MoviePopup {

  @State() error:HTMLElement;

  @Event({bubbles:true, composed:true}) eventCheck: EventEmitter<boolean>;

  closePopUp(status:boolean){
    this.eventCheck.emit(status);
  }

  bookTicket(){
    const loguser = localStorage.getItem("loguser");
    if(loguser===null){;
      location.href='#';
      alert('Please SignIn to Book Ticket');
      // this.error=<error-message message='SignIn to Book Ticket'></error-message>
    }
    else{
      
      location.href="/bookticket";
    }
  }
  render() {
    return (
      <Host>
 
        <div class="backdrop">
        
            <div class="popup">
            <div class="error"></div>
            <button class="close-btn" onClick={this.closePopUp.bind(this,true)}>X</button>
              <div class="detailTable">
                 <table >
                  <tr>
                    <td><h1>Commando 3</h1></td> 
                  </tr>
                  <tr>
                    <td><img src="../../assets/images/commando2.jpeg"></img></td>
                  </tr>
                  <tr>
                    <td><h3>Cast :</h3></td>
                    <td>
                      
                       Vidyut Jammwal as Commando Karanveer Singh Dogra (Karan)<br />
												Adah Sharma as Inspector Bhavna Reddy<br />
												Angira Dhar as British Intelligence Agent Mallika Sood<br />
												Gulshan Devaiah as Buraq Ansari<br />
                    </td>
                    </tr>
                  <tr>
                  <td><h3>Director :</h3> </td>
                  <td>Yash </td>
                  </tr>
                  <tr>
                  <td><h3>Description : </h3></td>
                  <td>
                    <p>
                    Commando 3 is a 2019 Indian Hindi-language action thriller film directed
												by Aditya Datt and produced by Vipul Amrutlal Shah, Reliance
												Entertainment.The film is the sequel of Commando: A One Man Army
												(2013) and Commando 2: The Black Money Trail (2017). The third
												installment of Commando film series, the film features Vidyut Jammwal,
												Adah Sharma, and Angira Dhar in lead roles, with Gulshan Devaiah
												portraying the antagonist.Jammwal reprises his role as
												the commando Karan, who goes undercover with encounter specialist
												Bhavana Reddy for an anti-terrorist mission in London.
                    </p>
                    </td>
                  </tr>

                  <tr><button onClick={this.bookTicket.bind(this)}>Book TIcket</button></tr>
            
                 </table>
                 </div>
            </div>
          </div>
      </Host>
    );
  }

}
