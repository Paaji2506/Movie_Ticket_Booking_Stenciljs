import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'admin-home',
  styleUrl: 'admin-home.css',
  shadow: true,
})
export class AdminHome {


  
  render() {
    return (
      <Host>

    <h1>Hello Admin....!!!!</h1>
      </Host>
    );
  }

}
