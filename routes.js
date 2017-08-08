module.exports = router => {
    router.get('/projects', getAllProjectInfo);
    router.get('/:project', getProject);
    router.get('/:project/source', getProjectSource);



    return router
}

const
    fs = require('fs'),
    { join } = require('path'),

    PROJECTS_FOLDER = join(__dirname, 'public', 'fcc'),

    exists = path => new Promise(resolve =>
        fs.exists(path, res => resolve(res))
    ),

    readFile = path => new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, res) => {
            if (err) {
                console.error('--->\t' + err.toString());
                reject(err);
            }
            resolve(res);
        })
    });

function getAllProjectInfo (req, res) {
    fs.readdir(PROJECTS_FOLDER, (err, folders) => {
        const
            payload = [],
            len = folders.length;
        let completed = 0;

        folders.map(dir => {
            const
                name        = dir,
                thumbPath   = join(PROJECTS_FOLDER, dir, 'thumbnail.png'),
                descPath    = join(PROJECTS_FOLDER, dir, 'description.txt');
            let
                description = null, thumbnail = null;

            const pushAndSendIfDone = obj => {
                payload.push(obj);
                if (completed == len) res.json(payload);
            };

            exists(thumbPath).then(thumb => {
                if (thumb) thumbnail = `/fcc/${dir}/thumbnail.png`;
                exists(descPath).then(desc => {
                    completed++;

                    if (desc) {
                        readFile(descPath).then(res => {
                            description = res;
                            pushAndSendIfDone({name, thumbnail, description});
                            
                        })
                    }
                    else pushAndSendIfDone({name, thumbnail, description});
                })
            })
        })
    });
}

function getProject ({ params }, res) {
    res.redirect(`fcc/${params.project}/docs/index.html`);
}

function getProjectSource (req, res) {}