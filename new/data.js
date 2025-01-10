import {makeAutoObservable,makeObservable} from "mobx";

class Data{
    constructor() {
        makeAutoObservable(this)
    }
    ADDRESS_SITE="http://localhost:3000"
    ADDRESS_SERVER="http://localhost:5000"
    WS_ADDRESS_SERVER="ws://localhost:5000"
    AccessToken = "sdfuyintwefcxbtixdfggjhxcerf";
    RefreshToken = "wktnaowereiuthqe-egweviawioeuf";
    Yandex_client_id = "44c728c0ab8f455784e845387e2c9bd8";
    Github_client_id = "Ov23liKITzR2Uv3VpUis";
    Github_secret = "0ec1bf07a584b55adaaeec763550606d293df410";
    Yandex_secret = "ffde646e2a4d4f1fb830ea1de2bf1f6a";

    //TG
    Yandex_client_id_tg = "7ad05c24919c421e9c59974d8b7e2a28";
    Yandex_secret_tg = "6beb28762a03406e847d00a23aec6df1";

    Github_client_id_tg = "Ov23lizVCHL6TuYqCqm1";
    Github_secret_tg = "46e1d0df21818d702b11d05ddae1b640c2e3d480";


}

export default new Data()