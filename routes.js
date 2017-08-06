module.exports = router => {

    router.get('/', (req, { send }) => send('index.html'));
    router.get('/resume', (req, { send }) => send('resume.html'))
    router.get('/fcc', (req, { send }) => send('fcc-projects.html'))

    router.get('fcc/projects', getAllProjectInfo);
    router.get('fcc/:project', getProject);
    router.get('fcc/:project/source', getProjectSource);



    return router
}

async function getAllProjectInfo (req, res) {
    const fs = require('fs');

    fs.readdir(PROJECTS_FOLDER, (err, folders) =>  res.json(folders.map(dir => {
            const
                name        = dir,
                thumbPath   = join(PROJECTS_FOLDER, dir, 'thumbnail.png'),
                descPath    = join(PROJECTS_FOLDER, dir, 'description.txt'),
                // lets us know whether to render a background image or not
                thumbnail   = await fs.exists(thumbPath) ? `/fcc/${dir}/thumbnail.png` : false,
                // reads the plaintext description to be sent to the client
                description = await fs.exists(descPath) ? await fs.readFile(descPath, 'utf8') : null;

            return { name, thumbnail, description };
        }))
    );
}

function getProject ({ params }, res) {
    res.redirect(`fcc/${params.project}/docs/index.html`);
}

function getProjectSource (req, res) {}