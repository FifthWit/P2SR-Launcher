package main

import (
	"Portal-2-Launcher/utils"
	"context"
	"encoding/json"
	"os"
	"os/exec"
)

// AppState struct to hold all our JSON data
type AppState struct {
    FilePath  string `json:"filepath"`
    FirstLoad bool   `json:"firstLoad"`
	SRConfigs map[string]bool `json:"srConfigs"`
}

type App struct {
    ctx context.Context
}

func NewApp() *App {
    return &App{}
}

func (a *App) startup(ctx context.Context) {
    a.ctx = ctx
    // Initialize state on startup
    if !a.stateFileExists() {
        a.SaveState(&AppState{FirstLoad: true})
    }
}

func (a *App) stateFileExists() bool {
    _, err := os.Stat("appstate.json")
    return !os.IsNotExist(err)
}

func (a *App) LoadState() (*AppState, error) {
    data, err := os.ReadFile("appstate.json")
    if err != nil {
        return &AppState{FirstLoad: true}, nil
    }
    var state AppState
    if err := json.Unmarshal(data, &state); err != nil {
        return nil, err
    }
    return &state, nil
}

func (a *App) SaveState(state *AppState) error {
    jsonData, err := json.Marshal(state)
    if err != nil {
        return err
    }
    return os.WriteFile("appstate.json", jsonData, 0644)
}

func (a *App) SaveFilePath(path string) error {
    state, err := a.LoadState()
    if err != nil {
        return err
    }
    state.FilePath = path
    return a.SaveState(state)
}

func (a *App) SetFirstLoadComplete() error {
    state, err := a.LoadState()
    if err != nil {
        return err
    }
    state.FirstLoad = false
    return a.SaveState(state)
}

func (a *App) CheckSRConfigs(status bool) error {
    state, err := a.LoadState()
    if err != nil {
        return err
    }

    if state.SRConfigs == nil {
        state.SRConfigs = make(map[string]bool)
    }

    // Set the SR configs status
    state.SRConfigs["enabled"] = status

    return a.SaveState(state)
}

func ValidateP2(filepath string) string {
    cfgPath := filepath + "/portal2/cfg/autoexec.cfg"
    command := `echo "hello world"`
    err := utils.AddCommand(cfgPath, command)
    if err != nil {
        return err.Error()
    }
    return "Command added successfully"
}

func (a *App) PlayPortal2() {
    state, err := a.LoadState()
    if err != nil {
        println("Error loading state:", err)
        return
    }
    println("FilePath:", state.FilePath)
	if state.FilePath == "" {
		println("File path is not set.")
		return
	}

	ValidateP2(state.FilePath)

	cmd := exec.Command(state.FilePath + "/portal2.exe")
	if err := cmd.Start(); err != nil {
		println("Error starting Portal 2:", err)
		return
	}
	println("Portal 2 started successfully.")
}


func (a *App) IsFirstLoad() (bool, error) {
    state, err := a.LoadState()
    if err != nil {
        return true, err
    }
    return state.FirstLoad, nil
}