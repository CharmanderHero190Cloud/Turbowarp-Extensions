(function() {
    class DoomWADBuilder {
        constructor(runtime) {
            this.runtime = runtime;
            this.wadName = "newwad";
            this.rooms = [];
        }

        // Set WAD Name
        setWADName(name) {
            this.wadName = name || "newwad";
        }

        // Make Cube Room
        makeCubeRoom(x, y, size) {
            const room = { id: this.rooms.length + 1, x, y, width: size, height: size, depth: size };
            this.rooms.push(room);
            return room.id;
        }

        // Download WAD
        downloadWAD(filename) {
            const wadData = JSON.stringify({ name: this.wadName, rooms: this.rooms }, null, 2);
            const blob = new Blob([wadData], { type: 'application/json' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = filename || this.wadName + ".wad.json";
            link.click();
        }

        getInfo() {
            return {
                id: 'doomWADBuilder',
                name: 'Doom WAD Builder',
                blocks: [
                    {
                        opcode: 'setWADName',
                        blockType: 'command',
                        text: 'Set WAD Name [NAME]',
                        arguments: {
                            NAME: { type: 'string', defaultValue: 'MyWAD' }
                        }
                    },
                    {
                        opcode: 'makeCubeRoom',
                        blockType: 'reporter',
                        text: 'Make Cube Room at X [X] Y [Y] Size [SIZE]',
                        arguments: {
                            X: { type: 'number', defaultValue: 0 },
                            Y: { type: 'number', defaultValue: 0 },
                            SIZE: { type: 'number', defaultValue: 64 }
                        }
                    },
                    {
                        opcode: 'downloadWAD',
                        blockType: 'command',
                        text: 'Download WAD as [FILENAME]',
                        arguments: {
                            FILENAME: { type: 'string', defaultValue: 'MyWAD.wad.json' }
                        }
                    }
                ]
            };
        }
    }

    if (typeof window.vm !== 'undefined') {
        // TurboWarp / Scratch VM
        window.vm.extensionManager.register(new DoomWADBuilder(window.vm));
    } else {
        console.warn('TurboWarp VM not detected. Load this extension via URL inside TurboWarp.');
    }
})();
