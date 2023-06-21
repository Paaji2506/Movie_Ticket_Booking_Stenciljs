import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'contact-page',
  styleUrl: 'contact-page.css',
  shadow: true,
})
export class ContactPage {

  render() {
    return (
      <Host>
        <h4>--------------------------------------------------------------------------------------------------------------Contact Us------------------------------------------------------------------------------------------------------------</h4>
    
        <div class="container">
    <h3>Leave a Message</h3>
    <p>If you have a question regarding our services,
      feel free to contact us using the form below.</p>

    <form name="contact-us-form" action="#">
      <div class="row100" id="fname-row100">
        <div class="col">
          <div class="inputBox" id="fname-inputBox">
            <input type="text" name="fname"/>
            <span class="text">First Name</span>
            <span class="line" id="fname-line"></span>
          </div>
        </div>
        <div class="col">
          <div class="inputBox" id="lname-inputBox">
            <input type="text" name="lname"/>
            <span class="text">Last Name</span>
            <span class="line" id="lname-line"></span>
          </div>
        </div>
      </div>
      <div class="row100" id="email-row100">
        <div class="col">
          <div class="inputBox" id="email-inputBox">
            <input type="email" name="email"/>
            <span class="text">Email ID</span>
            <span class="line" id="email-line"></span>
          </div>
        </div>
        <div class="col">
          <div class="inputBox" id="tel-inputBox">
            <input type="tel" name="m-num"  />
            <span class="text">Mobile Number</span>
            <span class="line" id="tel-line"></span>
          </div>
        </div>
      </div>
      <div class="row100">
        <div class="col">
          <div class="inputBox textarea">
            <textarea name="msg"></textarea>
            <span class="text">Type your message Here...</span>
            <span class="line"></span>
          </div>
        </div>
      </div>
      <div class="row100">
        <div class="col">
          <div class="submitbutton">
            <button class="btn submitbtn" type="submit">Submit</button>
          </div>
        </div>
      </div>
    </form>
  </div>
      </Host>
    );
  }

}
