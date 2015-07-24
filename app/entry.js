import { apiKey } from '../secret.js'
import { MatterMarkApi } from './js/mattermarkApi';
import './js/showCompanyStats';



let mmApi = new MatterMarkApi({apiKey: apiKey})
// console.log(mmApi)
// console.log(mmApi.getCompanies())
// console.log(mmApi.getCompany('10168389'))
