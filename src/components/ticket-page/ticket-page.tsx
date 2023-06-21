import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'ticket-page',
  styleUrl: 'ticket-page.css',
  shadow: true,
})
export class TicketPage {

  @Prop() movname:string;
  @Prop() quan:number;
  @Prop() price:number;
  @Prop() date:string;

  render() {
    return (
      <Host>
        <div class="container">
          <h4>Commando 3</h4>
          <h5>MoviesAdda Entertainment Private Limited</h5>
          <img src="../../assets/images/commando2.jpeg"></img>
          <div class="booking-details">
				<ul class="book-left">
					<li>Movie  </li>
					<li>Tickets</li>
					<li>Total</li>
					<li>Date</li>
				</ul>
				<ul class="book-right">
					<li>: {this.movname}</li>
					<li>: <span id="counter">{this.quan}</span></li>
					<li>: <b><i>RS.</i><span id="total">{this.price}</span></b></li>
					<li>: {this.date}</li>
				</ul>
				
			</div>
        </div>
      </Host>
    );
  }

}
