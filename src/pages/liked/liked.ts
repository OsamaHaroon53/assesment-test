import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { HttpProvider } from '../../providers/http/http';

@Component({
  selector: 'page-liked',
  templateUrl: 'liked.html'
})
export class LikedPage {

  pokemons = [];
  pokemonsCopy = [];
  constructor(public navCtrl: NavController, private http: HttpProvider) {
    this.getPokemons();
  }

  getPokemons() {
    this.http.get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=400')
      .then(res => {
        this.pokemons.push(...res['results']);
        this.pokemonsCopy.push(...res['results']);
        //get from firebase and filter
      })
      .catch(err => {
        console.log(err);
      })
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

  unLike() {
    
  }

}
