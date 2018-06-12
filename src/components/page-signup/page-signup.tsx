import { Component, Prop, State } from '@stencil/core';
import Tunnel from '../../providers/state-tunnel';
import { checkPassword, checkUsername } from '../../providers/user-state';

@Component({
  tag: 'page-signup',
  styleUrl: 'page-signup.css',
})
export class PageSignup {
  @State() username = '';
  @State() usernameError = null;
  @State() password = '';
  @State() passwordError = null;

  @Prop() signUpUser: (userName: string) => void;

  handleUsername(ev) {
    this.username = ev.target.value;
  }

  handlePassword(ev) {
    this.password = ev.target.value;
  }

  onSignup(e) {
    e.preventDefault();

    this.usernameError = checkUsername(this.username);
    this.passwordError = checkPassword(this.password);

    if (this.usernameError || this.passwordError) {
      return;
    }

    this.signUpUser(this.username);
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-button></ion-menu-button>
          </ion-buttons>
          <ion-title>Signup</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content padding>

        <div class="signup-logo">
          <img src="assets/img/appicon.svg" alt="Ionic Logo"/>
        </div>

        <form novalidate>
          <ion-list no-lines>
            <ion-item>
              <ion-label position="stacked" color="primary">Username</ion-label>
              <ion-input name="username" type="text" value={this.username} onInput={(ev) => this.handleUsername(ev)} required>
              </ion-input>
            </ion-item>
            <ion-text color="danger">
              <p hidden={this.usernameError} padding-left>
                {this.usernameError}
              </p>
            </ion-text>

            <ion-item>
              <ion-label position="stacked" color="primary">Password</ion-label>
              <ion-input name="password" type="password" value={this.password} onInput={(ev) => this.handlePassword(ev)} required>
              </ion-input>
            </ion-item>
            <ion-text color="danger">
              <p hidden={this.passwordError} padding-left>
                {this.passwordError}
              </p>
            </ion-text>
          </ion-list>

          <div padding>
            <ion-button onClick={(e) => this.onSignup(e)} type="submit" expand="block">Create</ion-button>
          </div>
        </form>

      </ion-content>
    ];
  }
}

Tunnel.injectProps(PageSignup, 'signUpUser');
