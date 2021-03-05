import axios from 'axios';
import { locationQueryApi } from 'const/locationQueryApi';

const locationQuery = query => axios(locationQueryApi(query));

export default locationQuery;
