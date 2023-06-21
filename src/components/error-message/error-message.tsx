import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'error-message',
  styleUrl: 'error-message.css',
  shadow: true,
})
export class ErrorMessage {
  @Prop() message:string;
  @Prop() success:boolean=false;

  displayMessage(msg:string,suc:boolean){
    document.querySelector<HTMLDivElement>('.error').style.display = 'block';
    document.querySelector('.error').innerHTML = msg;
    if (suc) {
      document.querySelector<HTMLDivElement>('.error').style.color = 'green';
  }
}

  render() {
         return this.displayMessage(this.message,this.success);

  }

}
