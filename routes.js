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

    exists = path => new Promise((resolve, reject) => {
        fs.exists(path, res => resolve(res))
    }),

    readFile = path => new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, res) => {
            if (err) {
                console.error('--------\t ->' + err.toString());
                reject(err);
            }
            resolve(res);
        })
    });

async function getAllProjectInfo (req, res) {
    fs.readdir(PROJECTS_FOLDER, (err, folders) => folders.map(dir => {
        const
            name        = dir,
            thumbPath   = join(PROJECTS_FOLDER, dir, 'thumbnail.png'),
            descPath    = join(PROJECTS_FOLDER, dir, 'description.txt');
        let
            description, thumbnail;

        exists(thumbPath).then(thumb => {
            thumbnail = thumb ? `/fcc/${dir}/thumbnail.png` : null;
            exists(descPath).then(desc => {
                description = desc ? readFile(descPath).then(res => res) : null;

                res.json({ name, thumbnail, description });
            })
        })

    }));
}

function getProject ({ params }, res) {
    res.redirect(`fcc/${params.project}/docs/index.html`);
}

function getProjectSource (req, res) {}