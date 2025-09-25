// Script to refresh the resources available to the front-end from configured sources.

import config from '../config.json' assert {type: 'json'};;
import fs from 'fs';

const resourceDir = 'public/resources';
const archiveDir = 'archive';

const formatUTCDateTime = () => {
    const date = new Date();

    return String(date.getUTCFullYear()) + 
        String(date.getUTCMonth() + 1).padStart(2, '0') + 
        String(date.getUTCDate()).padStart(2, '0') + 
        String(date.getUTCHours()).padStart(2, '0') + 
        String(date.getUTCMinutes()).padStart(2, '0') + 
        String(date.getUTCSeconds()).padStart(2, '0');;
}

if (fs.existsSync(resourceDir)) {
    // backup existing resources.
    fs.cpSync(resourceDir, `${archiveDir}/resources-${formatUTCDateTime()}`, { recursive: true });

    // remove existing resources.
    fs.rmSync(resourceDir, { recursive: true });
}



// copy resources from target locations into public resources directory.
fs.cpSync(config.tiles.graphicsPath, resourceDir + '/tiles', { recursive: true });
fs.copyFileSync(config.tiles.defaultTilePath, resourceDir + '/tiles/default-tile.png');
fs.copyFileSync(config.tiles.definitionsPath, resourceDir + '/tiles/tile-definitions.json');
fs.mkdirSync(resourceDir + '/entities');
fs.cpSync(config.entities.graphicsPath, resourceDir + '/entities', { 
    recursive: true, 
    filter: (source) => 
        fs.statSync(source).isDirectory() ? true : source.match(".*\\\\[0-9]*p\\\\sprite_[-0-9]*_0_1_0.png") != null
});
fs.copyFileSync(config.entities.defaultSpritePath, resourceDir + '/entities/default-sprite.png');
fs.copyFileSync(config.entities.definitionsPath, resourceDir + '/entities/entity-definitions.json');
fs.mkdirSync(resourceDir + '/map');
fs.copyFileSync(config.map.path, resourceDir + '/map/map.json');