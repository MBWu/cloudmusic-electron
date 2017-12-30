const { app, BrowserWindow}  = require( 'electron' );
const url  = require( 'url' );
const path = require( 'path' );

let win;

let isDevelopment = false;

if( isDevelopment ){

    require( 'electron-reload')(__dirname);
}

const createWindow = () => {

    win = new BrowserWindow(
        {
            width:1000,
            height: 660,
            frame: false
        }
    )

    win.loadURL( url.format({
        pathname: path.join( __dirname, './dist/index.html'),
        protocol: 'file:',
        slashes: true
    }))

    win.on( 'closed', () =>{

        app.quit();
    } );

    if( isDevelopment ){

        win.webContents.openDevTools();
    }

}

app.on( 'ready', createWindow);


app.on( 'window-all-closed', ()=>{

    if( process.platform !== 'drawin' ){

        app.quit();
    }
});

app.on( 'active', () =>{
    
        if( win === null){
    
            createWindow();
        }
    });
    