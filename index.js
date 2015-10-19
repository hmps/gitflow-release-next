var argv = require('minimist')(process.argv.slice(2));
var fs = require('fs');
var exec = require('child_process').exec;

var version;
var bump;
var newVersion;

var acceptedVersionBump = [ 'major', 'minor', 'patch' ];

if ( argv.version ) {
    if ( acceptedVersionBump.indexOf(argv.version) !== -1 ) {
        bump = argv.version;
    } else {
        console.log(argv.version + ' is no a valid bump type. Accepted types are major, minor, patch');
        throw 'Invalid bump type';
    }
} else {
    bump = 'patch';
}

fs.readFile('./package.json', 'utf8', parseVersion);


function parseVersion(err, response) {
    if (err) {
        console.log();
    }

    var pkg = JSON.parse(response);

    if ( !pkg.version ) {
        throw 'Could not read version from package.json. Is the file correctly formatted?';
    }

    newVersion = bumpVersion(pkg.version, bump);

    createNewReleaseBranch(newVersion);
}

function bumpVersion(currentVersion, type) {
    var versionArray = currentVersion.split('.');

    if ( acceptedVersionBump.indexOf(type) === -1 ) {
        throw 'Bump only accepts major, minor or patch bump types, ' + type + ' was given';
    }

    versionArray[acceptedVersionBump.indexOf(type)]++;

    return versionArray.join('.');
}


function confirmWrite(err) {
    if ( err ) throw err;

    console.log('Saved! New version is: ', newVersion);
}


function createNewReleaseBranch(name) {
    exec('git-flow release start ' + name, function(err, stdout, stderr) {
        if (err) throw err;

        console.log(stdout);
    });
}
