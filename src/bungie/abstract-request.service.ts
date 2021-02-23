import Axios, {AxiosInstance} from 'axios'

export abstract class AbstractRequestService {

    constructor(protected instance: AxiosInstance = Axios){}

    get axiosRef(): AxiosInstance {
        return this.instance;
    }
}
