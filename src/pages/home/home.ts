import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { ProfilePage } from '../profile/profile';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  nextUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10';
  pokemons = [];
  pokemonsCopy = [];
  constructor(public navCtrl: NavController, private http: HttpProvider) {
    this.getPokemons();
  }

  getPokemons(scroll?) {
    if (!this.nextUrl)
      return;
    this.http.get(this.nextUrl)
      .then(res => {
        this.pokemons.push(...res['results']);
        this.pokemonsCopy.push(...res['results']);
        this.nextUrl = res['next'];
        this.getUrl(this.pokemons[0]['url']);
        if (scroll)
          scroll.complete()
      })
      .catch(err => {
        console.log(err);
      })
  }

  doInfinite(infiniteScroll) {
    this.getPokemons(infiniteScroll);
  }

  filter(ev){
    let value = ev.target.value;
    this.pokemons = [... this.pokemonsCopy];
    if(value){
      this.pokemons = this.pokemons.filter(el=>{
        return (el.name.toLowerCase().indexOf(value.toLowerCase()) > -1)
      })
    }
  }

  getUrl(p_url) {
    return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + p_url.charAt(p_url.length - 2) + '.png';
  }

  profile(url) {
    this.navCtrl.push(ProfilePage,{url: url});
  }

  like() {
    
  }

}
