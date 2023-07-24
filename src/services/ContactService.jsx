import axios from 'axios';

export class ContactService {
    static serverURL = 'http://localhost:9000' ;

    static getALLContacts(){
        let dataURL = '${this.serverURL}/contacts';
        return axios.get(dataURL);
    }
}