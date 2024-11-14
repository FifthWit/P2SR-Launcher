package utils

import (
	"fmt"
	"os"
	"strings"
)

func AddCommand(cfgPath, command string) error {
    // Read the existing content of the file.
    content, err := os.ReadFile(cfgPath)
    if err != nil {
        return fmt.Errorf("failed to read file: %v", err)
    }
    fileStr := string(content)
    startMarker := "// ADDED BY P2SR LAUNCHER DO NOT REMOVE UNLESS YOU KNOW WHAT YOU'RE DOING"
    endMarker := "// END OF P2SR LAUNCHER COMMANDS"

    if strings.Contains(fileStr, command) {
        return fmt.Errorf("command already exists")
    }
    var builder strings.Builder
    builder.WriteString("\n" + startMarker + "\n")
    builder.WriteString(command + "\n")
    builder.WriteString(endMarker + "\n")
    // Open the file for appending.
    file, err := os.OpenFile(cfgPath, os.O_APPEND|os.O_WRONLY, 0644)
    if err != nil {
        return fmt.Errorf("failed to open file: %v", err)
    }
    defer file.Close()
    // Write the new content.
    _, err = file.WriteString(builder.String())
    if err != nil {
        return fmt.Errorf("failed to write to file: %v", err)
    }
    return nil
}