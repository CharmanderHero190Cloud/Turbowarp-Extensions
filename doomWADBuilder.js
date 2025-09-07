(function() {
    const ext = {};
    let wadName = "newwad";
    let rooms = [];

    // Required cleanup function
    ext._shutdown = function() {};

    // Status reporting
    ext._getStatus = function() {
        return { status: 2, msg: 'Ready' };
    };

    // Set WAD Name
    ext.setWADName = function(name) {
        wadName = name || "newwad";
    };

    // Make Cube Room
    ext.makeCubeRoom = function(x, y, size) {
        const room = { id: rooms.length + 1, x, y, width: size, height: size, depth: size };
        rooms.push(room);
        return room.id;
    };

    // Download WAD (works in TurboWarp)
    ext.downloadWAD = function(filename) {
        const wadData = JSON.stringify({ name: wadName, rooms: rooms }, null, 2);
        const dataUrl = 'data:text/json;charset=utf-8,' + encodeURIComponent(wadData);

        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = filename || wadName + ".wad.json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Block definitions
    const descriptor = {
        blocks: [
            [' ', 'Set WAD Name %s', 'setWADName', 'MyWAD'],
            ['r', 'Make Cube Room at X %n Y %n Size %n', 'makeCubeRoom', 0, 0, 64],
            [' ', 'Download WAD as %s', 'downloadWAD', 'MyWAD.wad.json']
        ],
        url: 'https://example.com' // optional
    };

    // Register extension
    if (typeof ScratchExtensions !== "undefined") {
        ScratchExtensions.register('Doom WAD Builder', descriptor, ext);
    } else {
        console.warn('Load this JS via TurboWarp Extensions → Add Extension → URL');
    }
})();
