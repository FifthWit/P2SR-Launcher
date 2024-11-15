package main

import (
	"Portal-2-Launcher/utils"
	"context"
	"encoding/json"
	"os"
	"os/exec"
)

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

    state.SRConfigs["enabled"] = status

    return a.SaveState(state)
}

func (a *App) PlayPortal2(override bool) (string, error) {
    state, err := a.LoadState()
    if err != nil {
        return "", err
    }
    if state.FilePath == "" {
        return "File path is not set.", nil
    }
    valid, err := utils.HashSar(state.FilePath + `/portal2/sar.dll`)
    if err != nil {
        return "", err
    }
    if !valid && !override {
        return "Invalid SAR hash.", nil
    }
    cmd := exec.Command(state.FilePath+"/portal2.exe", "-novid")
    if err := cmd.Start(); err != nil {
        return "", err
    }
    return "Portal 2 started successfully.", nil
}


func (a *App) IsFirstLoad() (bool, error) {
    state, err := a.LoadState()
    if err != nil {
        return true, err
    }
    return state.FirstLoad, nil
}