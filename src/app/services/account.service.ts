import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Account } from '../models/user.model';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';
import { nodeModuleNameResolver } from 'typescript';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AccountService {


    compte$ = new BehaviorSubject<Account | undefined>(undefined);

    constructor(private http: HttpClient) {}

    createAccount(prenom: string, nom : string, login: string, password: string, email : string, demandT1 : boolean, demandT2 : boolean, demandT3 : boolean, ecole: string, promotion: string, chambre: string) {
        console.log({"login": login, "password": password});
        return new Promise<any>((resolve, reject) => {
            this.http.post(
            environment.apiUrl + '/api/resident/register',
            {prenom : prenom, nom: nom,  loginAccountCreated: login, password: password, demandT1 : demandT1, demandT2 : demandT2, T3 : demandT3, ecole : ecole, email : email, promotion : promotion, chambre : chambre })
            .subscribe(
                (response) => {
                    resolve(response);
                },
                (error) => {
                    console.log({error : error})
                    reject(error);
                }
            );
        });
    }   

    createAccountFromAdmin(prenom: string, nom : string, login: string, password: string, email : string, demandT1 : boolean, demandT2 : boolean, demandT3 : boolean, ecole: string, promotion: string, paiement : string,  chambre: string) {
        console.log({"login": login, "password": password});
        return new Promise<any>((resolve, reject) => {
            this.http.post(
            environment.apiUrl +'/api/admin/createAccount',
            {loginSender: this.compte$.value!.login, prenom : prenom, nom: nom,  loginAccountCreated: login, password: password, T1 : demandT1, T2 : demandT2, T3 : demandT3, ecole : ecole, email : email, promotion : promotion, typePaiement : paiement, chambre : chambre })
            .subscribe(
                (response) => {
                    resolve(response);
                },
                (error) => {
                    console.log({error : error})
                    reject(error);
                }
            );
        });
    }   

    getAccount() {
        console.log("bienvenue");
        return new Promise<Account>((resolve, reject) => {
            this.http.post(
                environment.apiUrl +'/api/resident/', {loginSender : this.compte$.value!.login})
            .subscribe(
                (compte : any) => {
                    console.log({CompteReceived: compte});
                    resolve(compte.compte);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    };

    pwdChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    pwdLen = 10;

    createPassword() {
        return Array(this.pwdLen).fill(this.pwdChars).map(function(x) { return x[Math.floor(Math.random() * x.length)] }).join('')
    }

    // const newRequest = req.clone({
    //     headers: req.headers.set('Authorization', 'Bearer ' + authToken)
    //   });

    changePasswordAccount(token: string, newPassword: string) {
        /* On doit mettre des headers particuliers dans cette fonction, c'est unique dans tout le site (avec la fonction verifyEmail, plus bas).
        Normalement quand on veut faire authentifier un token dans le site c'est pour un compte, on peut donc utiliser l'interceptor.
        Cependant ici le token ne sert pas le même but, il faut donc le faire "à la main", c'est à dire en donnant des options à la requête HTTP */

        return new Promise<void>((resolve, reject) => {
            this.http.post(
            environment.apiUrl +'/api/recover/change',
            {token : 'bearer ' + token, newPassword : newPassword})
            .subscribe(
                () => {
                    resolve();
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }
    
    demandSendEmailRecoverPassword(login: string, email: string) {
        return new Promise<void>((resolve, reject) => {
            this.http.post(
            environment.apiUrl +'/api/recover/demand',
            {loginToChangePassword : login, emailAdressToSend : email})
            .subscribe(
                () => {
                    resolve();
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    verifyEmail(token: string) {
        /* On doit mettre des headers particuliers dans cette fonction, c'est unique dans tout le site (avec la fonction changePasswordAccount, plus haut).
        Normalement quand on veut faire authentifier un token dans le site c'est pour un compte, on peut donc utiliser l'interceptor.
        Cependant ici le token ne sert pas le même but, il faut donc le faire "à la main", c'est à dire en donnant des options à la requête HTTP */

        return new Promise<void>((resolve, reject) => {
            this.http.post(
            environment.apiUrl +'/api/resident/verify',
            {token : 'bearer ' + token})
            .subscribe(
                () => {
                    resolve();
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }


    disconnect() {
        this.compte$.next(undefined);
    }

}     