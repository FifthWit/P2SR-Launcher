package utils

import (
	"crypto/sha256"
	"encoding/hex"
	"io"
	"os"
)

func HashFile(filePath string) (string, error) {
    file, err := os.Open(filePath)
    if err != nil {
        return "", err
    }
    defer file.Close()

    hash := sha256.New()
    if _, err := io.Copy(hash, file); err != nil {
        return "", err
    }

    hashInBytes := hash.Sum(nil)
    hashString := hex.EncodeToString(hashInBytes)

    return hashString, nil
}

func HashSar(filepath string) (bool, error) {
    sarHash := "c1e54facb5363732d2f6956d30143746a22f379b853334d734dc330f1a7ed0bb"

    fileHash, err := HashFile(filepath)
    if err != nil {
        return false, err
    }

    if fileHash != sarHash {
        return false, nil
    }

    return true, nil
}