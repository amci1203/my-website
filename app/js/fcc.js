import makeProjectThumbnails from './modules/ProjectThumbnails';

(() => fetch('fcc/projects')
    .then(res => res.json())
    .then(res => makeProjectThumbnails(res))
)()