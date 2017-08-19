import axios from 'axios';
import makeProjectThumbnails from './modules/ProjectThumbnails';

axios.get('/fcc/projects')
    .then(res => makeProjectThumbnails(res.data))
    .catch(err => console.error(err.toString()));