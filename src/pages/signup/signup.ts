import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoService } from '../../services/domain/estado.service';
import { CidadeDTO } from '../../models/cidade.dto';
import { EstadoDTO } from '../../models/estado.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;
  estados: EstadoDTO[];
  cidades: CidadeDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public cidadeService: CidadeService,
    public estadoService: EstadoService,
    public clienteService: ClienteService,
    public alertCtrl: AlertController) {

      this.formGroup = this.formBuilder.group({
        nome: [ 'felipe', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        email: [ 'teste@gmail.com', [Validators.required, Validators.email]],
        tipo: [ '1', [Validators.required]],
        cpfCnpj: [ '12926615779', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
        senha: [ '123', [Validators.required]],
        logradouro: [ 'Rua Min. Viriato Vargas', [Validators.required]],
        numero: [ '190', [Validators.required]],
        complemento: [ 'SS202', []],
        bairro: [ 'Alto da Boa Vista', []],
        cep: [ '20531050', [Validators.required]],
        telefone1: [ '985277257', [Validators.required]],
        telefone2: [ '', []],
        telefone3: [ '', []],
        estadoId: [ null, [Validators.required]],
        cidadeId: [ null, [Validators.required]],
      });
  }

  ionViewWillLoad(){
    this.estadoService.findAll()
    .subscribe(response => {
      this.estados = response;
      this.formGroup.controls.estadoId.setValue(this.estados[0].id);
      this.updateCidades();
    },
    error => {});
  }

  updateCidades(){
    let estado_id = this.formGroup.value.estadoId;
    this.cidadeService.findAll(estado_id)
    .subscribe(response => {
      this.cidades = response;
      this.formGroup.controls.cidadeId.setValue(null);
    },
    error => {});
  }

  signupUser(){
    this.clienteService.insert(this.formGroup.value)
    .subscribe(response => {
      this.showInsertOk();
    },
    error => {});
  }

  showInsertOk(){
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Cadastro efetuado com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }
}
