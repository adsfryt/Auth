import {makeAutoObservable,makeObservable} from "mobx";

class Data{
    constructor() {
        makeAutoObservable(this)
    }
    ADDRESS_SITE="http://localhost:3000"
    ADDRESS_SERVER="http://localhost:5000"
    WS_ADDRESS_SERVER="ws://localhost:5000"
    AccessToken = "";
    RefreshToken = "";
    Yandex_client_id = "";
    Github_client_id = ";
    Github_secret = "";
    Yandex_secret = "";

    //TG
    Yandex_client_id_tg = "";
    Yandex_secret_tg = "";

    Github_client_id_tg = "";
    Github_secret_tg = "";


}

export default new Data()
