package main

import (
	"embed"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
	"github.com/wailsapp/wails/v2/pkg/options/windows"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
    app := NewApp()

    err := wails.Run(&options.App{
        Title:  "P2SR Launcher",
        Width:  1024,
        Height: 768,
        MinWidth: 1080,
        MinHeight: 800,
        AssetServer: &assetserver.Options{
            Assets: assets,
        },
        BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 0},
        OnStartup:        app.startup,
        Bind: []interface{}{
            app,
        },
        Windows: &windows.Options{
            WindowIsTranslucent: true,
            BackdropType:        windows.Acrylic,
            DisableWindowIcon:   false,
            DisableFramelessWindowDecorations: false,
            Theme: windows.SystemDefault,
        },
    })

    if err != nil {
        println("Error:", err.Error())
    }
}